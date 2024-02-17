import Text from "@/app/inputs/Text";
import Number from "@/app/inputs/Number";
import Date from "@/app/inputs/Date";
import Boolean from "@/app/inputs/Boolean";
import Select from "@/app/inputs/Select";
import NotFound from "@/app/custom/errors/404";

import React from 'react';




export default function InputSection(props: {formGroups: any, setInputValues: any, inputValues: any,})
{
  const { formGroups, setInputValues, inputValues } = props;


  return (<div>
    {formGroups &&
      Object.keys(formGroups).map((groupKey) => (
          <div key={groupKey}>
            <h2>{groupKey}</h2>
              {formGroups[groupKey].map((element, index) => {
      
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
                })}  
          </div>
      ))}
  </div>
  );
} 
  