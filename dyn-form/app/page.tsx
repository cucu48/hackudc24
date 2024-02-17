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

  //Emmagatzenem els inputs de les entrades en un vector
  const [inputValues, setInputValues] = useState({}); // Estado para almacenar los valores de los elementos
  function handleInputChange(event) {
    const { id, value } = event.target;
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));

  }


  function dependence(element) {
    if (element && element.field_dependent_on) {
      //Revisa el valor actual de la entrada pare
      const dependentFieldValue = inputValues[element.field_dependent_on.field_id];
      if (dependentFieldValue === element.field_dependent_on.field_value) {
        return true;
      } else {
        return false;
      }
    }
    return element.field_readonly;
  }

  return (
    <div>
      <div>
        <h1>{data.form_type_name}</h1>
        <p>{data.form_type_description}</p>

      </div>

          {data.form_fields && data.form_fields.map((element, index) => (
          

            // if element type is text
            element.field_type === "text" ?
            <StyledDiv id={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input type="text" onChange={handleInputChange} disabled={dependence(element)} />
              
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
            <div id={element.field_id} class="container">
              <label>{element.field_name}</label>
              <input type="number" onChange={handleInputChange} disabled={dependence(element,data)} />
            </div>
          : 
          element.field_type === "date" ?
            <div id={element.field_id} class="container">
              <label>{element.field_name}</label>
              <input type="date" onChange={handleInputChange} disabled={dependence(element,data)} />
            </div>
          : 
          element.field_type === "boolean" ?
            <div id={element.field_id} class="container">
              <label>{element.field_name}</label>
              <input type="checkbox" onChange={handleInputChange} disabled={dependence(element,data)} />
            </div>
          : 
          element.field_type === "select" ?
            <div id={element.field_id} class="container">
              <label>{element.field_name}</label>
              <select  onChange={handleInputChange} disabled={element.field_readonly} >
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