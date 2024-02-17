"use client";

import { Console } from "console";
import React from "react";
import { useState, useEffect } from "react";
import InputSection from "@/app/inputs/Main";

export default function Page() {
  const [inputValues, setInputValues] = useState({}); // Estado para almacenar los valores de los elementos

  const url = "https://2433625b-4e68-4689-8259-532bce7b715d.mock.pstmn.io";
  const [data, setData] = useState([]);
  
  useEffect(() => {
    try {
      fetch(url + "/api/v1/formTypes/1")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          // console.log(data);
          for (const element of data.form_fields) {
            setInputValues((prevState) => ({
              ...prevState,
              [element.field_id]: [element.field_default_value, element],
            }));
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  //Emmagatzenem els inputs de les entrades en un vector

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
            // console.log("SHOW", id, fatherValue);
            document.getElementById(id)?.setAttribute("style", "display:block");
          } else {
            // console.log("HIDE", id, fatherValue);
            document.getElementById(id)?.setAttribute("style", "display:none");
            // console.log(trueelem);
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
        <InputSection data={data} setInputValues={setInputValues} />
        <input type="submit" value="Send form" disabled />
        <p className="text-black-50">
          This form requires to be filled following each requirement.
        </p>
      </form>
    </div>
  );
}


