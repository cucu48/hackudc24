import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";
import { useState } from "react";

export default function Text(props: {
  element: any;
  setInputValues: any;
  inputValues: any;
}) {
  const { element, setInputValues, inputValues } = props;
  const inputId = "inp" + element.field_id;
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "Please enter a valid value."
  );

  const handleValidation = (value: any) => {
    // Implement your specific validation logic here

    if (
      element.field_validations == null ||
      element.field_validations == undefined
    ) {
      setIsValid(isValid);
    } else {
      if (element.field_validations.format !== undefined) {
        const regex = new RegExp(element.field_validations.format);
        const isValid = regex.test(value);
        isValid ? setErrorMessage("") : setErrorMessage("Text is not valid");
        setIsValid(isValid);
      } else {
        setErrorMessage("Text format is not valid");
      }
      if (element.field_validations.min_length !== undefined) {
        const isValid = value.length >= element.field_validations.min_length;
        isValid
          ? setErrorMessage("")
          : setErrorMessage("Text should be at least 10 characters");
        setIsValid(isValid);
      }
    }
  };

  return (
    <StyledDiv
      id={element.field_id}
      className={`mb-3`} // Apply Bootstrap validation class
      key={element.field_id}
      display={element.field_dependent_on}
    >
      <label htmlFor={inputId} className="form-label">
        {element.field_icon && (
          <i className={element.field_icon} style={{ marginRight: "10px" }}></i>
        )}
        {element.field_name}
      </label>
      <p className="mb-1 text-black-50">{element.field_description}</p>

      <input
        id={inputId}
        className={`form-control ${isValid ? "" : "is-invalid"}`} // Apply Bootstrap validation class
        type="text"
        name={inputId}
        onChange={(event) => {
          handleInputChange(event, element, setInputValues, inputValues);
          handleValidation(event.target.value);
        }}
        required={element.field_required}
        readOnly={element.field_readonly}
      />
      <div className="invalid-feedback">
        {/* Show validation error message if input is invalid */}
        {errorMessage}
      </div>
    </StyledDiv>
  );
}
