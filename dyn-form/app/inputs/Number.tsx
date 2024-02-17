import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";
import { useState } from "react";

export default function Number(props: { element: any; setInputValues: any; inputValues: any }) {
  const { element, setInputValues, inputValues } = props;
  const inputId = "inp" + element.field_id;
  const [isValid, setIsValid] = useState(true);

  const handleValidation = (value) => {
    // Implement your specific validation logic here
    // Example: Validate that the number is within a specific range
    const minValue = element.field_validations.min_value;
    const maxValue = element.field_validations.max_value;

    const isValid = (minValue === undefined || value >= minValue) &&
        (maxValue === undefined || value <= maxValue);

    setIsValid(isValid);
  };

  return (
      <StyledDiv
          id={element.field_id}
          className={`mb-3`} // Apply Bootstrap validation class
          key={element.field_id}
          display={element.field_dependent_on}
      >
        <label htmlFor={inputId} className="form-label">
          {element.field_name}
        </label>
        <p className="mb-1 text-black-50">{element.field_description}</p>
        {element.field_icon && (
          <i className={element.field_icon} style={{ marginRight: "10px" }}></i>
        )}
        <input
            id={inputId}
            className={`form-control ${isValid ? '' : 'is-invalid'}`} // Apply Bootstrap validation class
            type="number"
            name={inputId}
            onChange={(event) => {
              handleInputChange(event, element, setInputValues, inputValues);
              handleValidation(parseFloat(event.target.value));
            }}
            required={element.field_required}
            disabled={element.field_readonly}
            min={element.field_validations.min_value}
            max={element.field_validations.max_value}
        />
        <div className="invalid-feedback">
          {/* Show validation error message if input is invalid */}
          Please enter a valid number within the specified range.
        </div>
      </StyledDiv>
  );
}
