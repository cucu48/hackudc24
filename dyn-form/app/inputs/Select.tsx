import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";
import { useState } from "react";

export default function Select(props: {
  element: any;
  setInputValues: any;
  inputValues: any;
}) {
  const { element, setInputValues, inputValues } = props;
  const inputId = "inp" + element.field_id;
  const [isValid, setIsValid] = useState(true);

  const handleValidation = (value) => {
    // Implement your specific validation logic here
    // Example: Validate that the selected value is within a specific set of options
    const validOptions = element.field_validations.options || [];
    const isValid = validOptions.includes(value);
    setIsValid(isValid);
  };

  return (
      <StyledDiv
          id={element.field_id}
          className={`mb-3 ${isValid ? '' : 'was-validated'}`} // Apply Bootstrap validation class
          key={element.field_id}
          display={
              element.field_dependent_on &&
              document.getElementById("inp" + element.field_dependent_on.field_id)
                  ?.value === element.field_dependent_on.field_value
          }
      >
        <label htmlFor={inputId} className="form-label">
          {element.field_name}
        </label>
        <p className="mb-1 text-black-50">{element.field_description}</p>
        <select
            id={inputId}
            className={`form-select ${isValid ? '' : 'is-invalid'}`} // Apply Bootstrap validation class
            onChange={(event) => {
              handleInputChange(event, element, setInputValues, inputValues);
              handleValidation(event.target.value);
            }}
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
        <div className="invalid-feedback">
          {/* Show validation error message if input is invalid */}
          Please select a valid option.
        </div>
      </StyledDiv>
  );
}
