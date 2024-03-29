import Text from "@/app/inputs/Text";
import Number from "@/app/inputs/Number";
import Date from "@/app/inputs/Date";
import Boolean from "@/app/inputs/Boolean";
import Select from "@/app/inputs/Select";
import NotFound from "@/app/custom/errors/404";
import Color from "@/app/inputs/Color";
import Range from "@/app/inputs/Range";
import Recaptcha from "@/app/inputs/Recaptcha";

import React from 'react';


export default function InputSection(props: {formGroups: any, formNames: any, setInputValues: any, inputValues: any,})
{
  const { formGroups,formNames, setInputValues, inputValues } = props;


  return (<div>
    {formGroups &&
      Object.keys(formGroups).map((groupKey) => (
          <fieldset className="border border-dark rounded p-4 mb-5" key={formNames[groupKey]}>
            <legend className="float-none w-auto">{formNames[groupKey]}</legend>
              {formGroups[groupKey].map((element:any, index:any) => {
      
                switch (element.field_type) {
                  case "text":
                  case "string":
                    return <Text element={element} key={index} setInputValues={setInputValues} inputValues={inputValues}/>;
                  case "number":
                    return <Number element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "date":
                    return <Date element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "boolean":
                    return <Boolean element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "select":
                    return <Select element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "color":
                    return <Color element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "range":
                    return <Range element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  case "recaptcha":
                    return <Recaptcha element={element} key={index} setInputValues={setInputValues} inputValues={inputValues} />;
                  default:
                    console.error(element.field_type + " not found");
                    return <NotFound />;
                  }
                })}  
          </fieldset>
      ))}
  </div>
  );
} 
  