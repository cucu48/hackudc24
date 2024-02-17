import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";

export default function Select(props: {
  element: any;
  setInputValues: any;
  inputValues: any;
}) {
  const { element, setInputValues, inputValues } = props;
  const inputId = "inp" + element.field_id;
  return (
    <StyledDiv
      id={element.field_id}
      className="mb-3"
      key={element.field_id}
      display={
        element.field_dependent_on &&
        document.getElementById("inp" + element.field_dependent_on.field_id)
          ?.value === element.field_dependent_on.field_value
      }
    >
      <label for={inputId} className="form-label">
        {element.field_name}
      </label>
      <p className="mb-1 text-black-50">{element.field_description}</p>
      <select
        id={inputId}
        className="form-select"
        onChange={(event) =>
          handleInputChange(event, element, setInputValues, inputValues)
        }
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
    </StyledDiv>
  );
}
