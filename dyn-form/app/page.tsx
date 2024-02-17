"use client";

import { Console } from "console";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  //                                  none here   block here
  display: ${(props) => (props.display ? "none" : "block")};
  // remove this line in production
  // background-color: ${(props) => (props.display ? "red" : "blue")};
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
            [element.field_id]: [element.field_default_value, element],
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

        if (trueelem.field_dependent_on) {
          const fatherValue = inputValues[trueelem.field_dependent_on.field_id];
          if (
            fatherValue &&
            fatherValue[0] === trueelem.field_dependent_on.field_value
          ) {
            console.log("SHOW", id, fatherValue);
            document.getElementById(id)?.setAttribute("style", "display:block");
          } else {
            console.log("HIDE", id, fatherValue);
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
      <form action="" method="post" className="container">
        <div>
          <h1 className="mb-5">{data.form_type_name}</h1>
          <p>{data.form_type_description}</p>
        </div>

        {data.form_fields &&
          data.form_fields.map((element, index) =>
            // if element type is text
            element.field_type === "text" ? (
              <StyledDiv 
                id={element.field_id}
                className="mb-3"
                key={element.field_id}
                display={element.field_dependent_on}
              >
                <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
                <p className="mb-1 text-black-50 ">{element.field_description}</p>
                <input
                  id={"inp"+element.field_id}
                  className="form-control"
                  type="text"
                  onChange={(event) => handleInputChange(event, element)}
                  required={element.field_required}
                  minLength={element.field_validations.min_length}
                  maxLength={element.field_validations.max_length}
                  readOnly={element.field_readonly}
                />
              </StyledDiv>
            ) : element.field_type === "number" ? (
              <StyledDiv
                id={element.field_id}
                className="mb-3"
                key={element.field_id}
                display={element.field_dependent_on}
              >
                <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
                <p className="mb-1 text-black-50">{element.field_description}</p>
                <input
                  id={"inp"+element.field_id}
                  className="form-control"
                  type="number"
                  onChange={(event) => handleInputChange(event, element)}
                  required={element.field_required}
                  disabled={element.field_readonly}
                  // add an OPTIONAL attibute to the minimum value
                  min={element.field_validations.min_value}
                  // add an OPTIONAL attibute to the maximum value
                  max={element.field_validations.max_value}
                />
              </StyledDiv>
            ) : element.field_type === "date" ? (
              <StyledDiv
                id={element.field_id}
                className="mb-3"
                key={element.field_id}
                display={element.field_dependent_on}
              >
                <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
                <p className="mb-1 text-black-50">{element.field_description}</p>
                <input
                  id={"inp"+element.field_id}
                  className="form-control"
                  type="date"
                  min={element.field_validations.min_value}
                  max={element.field_validations.max_value}
                  disabled={element.field_readonly}
                  required={element.field_required}
                  onChange={(event) => handleInputChange(event, element)}
                />
              </StyledDiv>
            ) : element.field_type === "boolean" ? (
              <StyledDiv
                id={element.field_id}
                className="form-check"
                key={element.field_id}
                display={element.field_dependent_on}
              >
                <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
                <input
                  id={"inp"+element.field_id}
                  className="form-check-input"
                  type="checkbox"
                  required={element.field_required}
                  disabled={element.field_readonly}
                  onChange={(event) => handleInputChange(event, element)}
                />
                <p className="mb-1 text-black-50">{element.field_description}</p>
              </StyledDiv>
            ) : element.field_type === "select" ? (
              <StyledDiv
                id={element.field_id}
                className="mb-3"
                key={element.field_id}
                display={element.field_dependent_on && document.getElementById("inp"+element.field_dependent_on.field_id)?.value === element.field_dependent_on.field_value}
              >
                <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
                <p className="mb-1 text-black-50">{element.field_description}</p>
                <select
                  id={"inp"+element.field_id}
                  className="form-select"
                  onChange={(event) => handleInputChange(event, element)}
                  required={element.field_required}
                  disabled={element.field_readonly}
                >
                  {element.field_validations.options &&
                    element.field_validations.options.map((option, index) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </StyledDiv>
            ) : (
              <div>not found: {element.field_type} </div>
            )
          )}
        <input type="submit" value="Send form" disabled />
        <p className="text-black-50">
          This form requires to be filled following each requirement.
        </p>
      </form>
    </div>
  );
}

export default Page;
