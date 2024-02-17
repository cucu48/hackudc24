import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";
import { useState } from "react";

export default function Color(props: { element: any, setInputValues: any, inputValues: any }) {
    const { element, setInputValues, inputValues } = props;
    const inputId = "inp" + element.field_id;
    const [isValid, setIsValid] = useState(true);

    const handleValidation = (value: any) => {
        // Implement your specific validation logic here
        // Example: Validate that the date is within a specific range
        setIsValid(isValid);
    };

    return (
        <StyledDiv
            id={element.field_id}
            className={`mb-3 ${isValid ? '' : 'was-validated'}`} // Apply Bootstrap validation class
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
                className={`form-control ${isValid ? '' : 'is-invalid'}`} // Apply Bootstrap validation class
                type="color"
                name={inputId}
                disabled={element.field_readonly}
                required={element.field_required}
                onChange={(event) => {
                    handleInputChange(event, element, setInputValues, inputValues);
                    handleValidation(event.target.value);
                }}
            />
            <div className="invalid-feedback">
                {/* Show validation error message if input is invalid */}
                Please select a valid color within the specified range.
            </div>
        </StyledDiv>
    );
}
