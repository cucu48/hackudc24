'use client';

import {useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  //                                  none here   block here
  display: ${props => props.display ? 'block' : 'block'};
  // remove this line in production
  background-color: ${props => props.display ? 'red' : 'blue'};
`;



function Page() {
  const url = "https://2433625b-4e68-4689-8259-532bce7b715d.mock.pstmn.io";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url+'/api/v1/formTypes/1').then((res) => res.json()).then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  

  return (
    <div>
      <div>
        <h1>{data.form_type_name}</h1>
        <p>{data.form_type_description}</p>

      </div>

          {data.form_fields && data.form_fields.map((element, index) => (
          

            // if element type is text
            element.field_type === "text" ?
            <StyledDiv id={index} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input type="text" disabled={element.field_readonly} />
              
              {/* {element.field_dependent_on && (
                <script>  
                
                  document.getElementById('{element.field_dependent_on.field_id}').addEventListener('input', function (evt) {
                  if(this.value === element.field_dependent_on.field_value){
                    getElementById({element.field_id}).style.display = 'block';
                  } else {
                    getElementById({element.field_id}).style.display = 'none';
                  }
                });
              </script>
              )} */}
            </StyledDiv>
          : 
          element.field_type === "number" ?
            <div id={index} class="container">
              <label>{element.field_name}</label>
              <input type="number" disabled={element.field_readonly} />
            </div>
          : 
          element.field_type === "date" ?
            <div id={index} class="container">
              <label>{element.field_name}</label>
              <input type="date" disabled={element.field_readonly} />
            </div>
          : 
          element.field_type === "boolean" ?
            <div id={index} class="container">
              <label>{element.field_name}</label>
              <input type="checkbox" disabled={element.field_readonly} />
            </div>
          : 
          element.field_type === "select" ?
            <div id={index} class="container">
              <label>{element.field_name}</label>
              <select disabled={element.field_readonly} >
                {element.field_validations.options && element.field_validations.options.map((option, index) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          : 
          <div>not found: {element.field_type}  </div>
          ))}
      </div>
    
  );
}

export default Page;