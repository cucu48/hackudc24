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
  const [formGroups, setFormGroups] = useState({});
  //const [formFields, setFormFields] = useState({});


  const url = "https://2433625b-4e68-4689-8259-532bce7b715d.mock.pstmn.io";
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url + "/api/v1/formTypes/1")
        .then((res) => res.json())
        .then((data) => {
          setData(data);

          const fields_by_groups = data.form_fields.reduce((groups, field) => {
            const group = groups[field.field_group] || [];
            return {
              ...groups,
              [field.field_group]: [...group, field],
            };
          }, {});

          //Ordena los campos por cada grupo
          for (const groupKey in fields_by_groups) {
            fields_by_groups[groupKey].sort((a, b) => a.field_order - b.field_order);
          }

          console.log(fields_by_groups)

          //Guarda el array ordenado
          setFormGroups(fields_by_groups);

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
        <form action="" method="post">
          <div>
            <h1>{data.form_type_name}</h1>
            <p>{data.form_type_description}</p>
          </div>

          {formGroups &&
              Object.keys(formGroups).map((groupKey) => (
                  <div key={groupKey}>
                    <h2>{groupKey}</h2>
                    {formGroups[groupKey].map((element) => (
                        // if element type is text
                        element.field_type === "text" ? (
                            <StyledDiv
                                id={element.field_id}
                                key={element.field_id}
                                display={element.field_dependent_on}
                            >
                              <label>{element.field_name}</label>
                              <input
                                  id={"inp" + element.field_id}
                                  type="text"
                                  onChange={(event) => handleInputChange(event, element)}
                                  required={element.field_required}
                                  minLength={element.field_validations.min_length}
                                  maxLength={element.field_validations.max_length}
                                  readOnly={element.field_readonly}
                              />
                              <p className="muted-text">{element.field_description}</p>
                            </StyledDiv>
                        ) : element.field_type === "number" ? (
                            <StyledDiv
                                id={element.field_id}
                                key={element.field_id}
                                display={element.field_dependent_on}
                            >
                              <label>{element.field_name}</label>
                              <input
                                  id={"inp" + element.field_id}
                                  type="number"
                                  onChange={(event) => handleInputChange(event, element)}
                                  required={element.field_required}
                                  disabled={element.field_readonly}
                                  min={element.field_validations.min_value}
                                  max={element.field_validations.max_value}
                              />
                              <p className="muted-text">{element.field_description}</p>
                            </StyledDiv>
                        ) : element.field_type === "date" ? (
                            <StyledDiv
                                id={element.field_id}
                                key={element.field_id}
                                display={element.field_dependent_on}
                            >
                              <label>{element.field_name}</label>
                              <input
                                  id={"inp" + element.field_id}
                                  type="date"
                                  min={element.field_validations.min_value}
                                  max={element.field_validations.max_value}
                                  disabled={element.field_readonly}
                                  required={element.field_required}
                                  onChange={(event) => handleInputChange(event, element)}
                              />
                              <p className="muted-text">{element.field_description}</p>
                            </StyledDiv>
                        ) : element.field_type === "boolean" ? (
                            <StyledDiv
                                id={element.field_id}
                                key={element.field_id}
                                display={element.field_dependent_on}
                            >
                              <label>{element.field_name}</label>
                              <input
                                  id={"inp" + element.field_id}
                                  type="checkbox"
                                  required={element.field_required}
                                  disabled={element.field_readonly}
                                  onChange={(event) => handleInputChange(event, element)}
                              />
                              <p className="muted-text">{element.field_description}</p>
                            </StyledDiv>
                        ) : element.field_type === "select" ? (
                            <StyledDiv
                                id={element.field_id}
                                key={element.field_id}
                                display={element.field_dependent_on && document.getElementById("inp" + element.field_dependent_on.field_id)?.value === element.field_dependent_on.field_value}
                            >
                              <label>{element.field_name}</label>
                              <select
                                  id={"inp" + element.field_id}
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
                              <p className="muted-text">{element.field_description}</p>
                            </StyledDiv>
                        ) : (
                            <div>not found: {element.field_type} </div>
                        )
                    ))}
                  </div>
              ))}
        </form>
      </div>
  );
}
export default Page;
