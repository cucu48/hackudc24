"use client";

import { Console } from "console";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  //                                  none here   block here
  display: ${(props) => (props.display ? "none" : "block")};
  // remove this line in production
  background-color: ${(props) => (props.display ? "red" : "blue")};
`;

function Page() {
  const [inputValues, setInputValues] = useState({}); // Estado para almacenar los valores de los elementos

  const url = "https://2433625b-4e68-4689-8259-532bce7b715d.mock.pstmn.io";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url + "/api/v1/formTypes/1")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
        for (const element of data.form_fields) {
          setInputValues((prevState) => ({
            ...prevState,
            [element.field_id]: ["", element],
          }));
        }
      });
  }, []);

  //Emmagatzenem els inputs de les entrades en un vector
  function handleInputChange(event: any, element: any) {
    const elem = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [element.field_id]: [elem.value, element],
    }));
  }

  useEffect(
    function dependence() {
      // implement a function to change the display value of the elements
      // console.log(inputValues);
      for (const a of Object.entries(inputValues)) {
        const id = a[0];
        const elem = a[1];

        const value = elem[0];
        const trueelem = elem[1];

        if (
          trueelem.field_dependent_on
        ) {
          const fatherValue = inputValues[trueelem.field_dependent_on.field_id];
          if (
            fatherValue &&
            fatherValue[0] === trueelem.field_dependent_on.field_value
          ) {
            console.log(
              "SHOW", id, fatherValue);
            document.getElementById(id)?.setAttribute("style", "display:block");
          } else {
            console.log(
              "HIDE", id, fatherValue);
              document.getElementById(id)?.setAttribute("style", "display:none");
            console.log(trueelem);
            
          }
        }
      }
    },
    [inputValues]
  );

  return (
    <div>
      <div>
        <h1>{data.form_type_name}</h1>
        <p>{data.form_type_description}</p>
      </div>

      {data.form_fields &&
        data.form_fields.map((element, index) =>
          // if element type is text
          element.field_type === "text" ? (
            <StyledDiv id={element.field_id} key={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input
                type="text"
                onChange={(event) => handleInputChange(event, element)}
              />
              <p className="muted-text">{element.field_description}</p>
            </StyledDiv>
          ) : element.field_type === "number" ? (
            <StyledDiv id={element.field_id} key={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input
                type="number"
                onChange={(event) => handleInputChange(event, element)}
              />
              <p className="muted-text">{element.field_description}</p>
            </StyledDiv>
          ) : element.field_type === "date" ? (
            <StyledDiv id={element.field_id} key={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input
                type="date"
                onChange={(event) => handleInputChange(event, element)}
              />
              <p className="muted-text">{element.field_description}</p>
            </StyledDiv>
          ) : element.field_type === "boolean" ? (
            <StyledDiv id={element.field_id} key={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <input
                type="checkbox"
                onChange={(event) => handleInputChange(event, element)}
              />
              <p className="muted-text">{element.field_description}</p>
            </StyledDiv>
          ) : element.field_type === "select" ? (
            <StyledDiv id={element.field_id} key={element.field_id} display={element.field_dependent_on}>
              <label>{element.field_name}</label>
              <select onChange={(event) => handleInputChange(event, element)}>
                {element.field_validations.options &&
                  element.field_validations.options.map((option, index) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              <p className="muted-text">{element.field_description}</p>
            </StyledDiv>
          ) : (
            <div>not found: {element.field_type} </div>
          )
        )}
    </div>
  );
}

export default Page;
