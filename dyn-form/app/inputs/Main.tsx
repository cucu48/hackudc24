import Text from "@/app/inputs/Text";
import Number from "@/app/inputs/Number";
import Date from "@/app/inputs/Date";
import Boolean from "@/app/inputs/Boolean";
import Select from "@/app/inputs/Select";
import NotFound from "@/app/custom/errors/404";

import React from 'react';




export default function InputSection(props: {data: any, setInputValues: any, inputValues: any,})
{
  const { data, setInputValues, inputValues } = props;


  return (
    data.form_fields && 
      data.form_fields.map((element : any, index : any) => {
        switch (element.field_type) {
          case "text":
            console.log("text");
            return <Text element={element} key={index} setInputValues={setInputValues} inputValues={inputValues}/>;
          case "number":
            return <Number element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
          case "date":
            return <Date element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
          case "boolean":
            return <Boolean element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
          case "select":
            return <Select element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
          default:
            return <NotFound />;
        }
      }
    )
  );
}