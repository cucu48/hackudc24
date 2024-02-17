import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import { useState } from "react";

export default function Recaptcha(props: {
  element: any;
  setInputValues: any;
  inputValues: any;
}) {
  const { element, setInputValues, inputValues } = props;
  const inputId = "inp" + element.field_id;
  const [isValid, setIsValid] = useState(true);

  return (
    <StyledDiv
      id={element.field_id}
      className={`mb-3 ${isValid ? "" : "was-validated"}`} // Apply Bootstrap validation class
      key={element.field_id}
      display={element.field_dependent_on}
    >
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>
      <label htmlFor={inputId} className="form-label">
        {element.field_icon && (
          <i className={element.field_icon} style={{ marginRight: "10px" }}></i>
        )}
        {element.field_name}
      </label>
      <p className="mb-1 text-black-50">{element.field_description}</p>
      <div
        className="g-recaptcha"
        id={inputId}
        data-sitekey={element.recaptcha_pk}
      ></div>
    </StyledDiv>
  );
}
