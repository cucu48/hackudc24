import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";



export default function Text(props: {element: any, setInputValues: any, inputValues: any}) {
  const { element, setInputValues, inputValues } = props;  
  const inputId = "inp" + element.field_id;

  return (
    <StyledDiv
      id={element.field_id}
      key={element.field_id}
      display={element.field_dependent_on}
    >
      <label for={inputId} className="form-label">
        {element.field_name}
      </label>
      <input
        id={inputId}
        className="form-control"
        type="text"
        onChange={(event) => handleInputChange(event, element, setInputValues, inputValues)}
        required={element.field_required}
        minLength={element.field_validations.min_length}
        maxLength={element.field_validations.max_length}
        readOnly={element.field_readonly}
      />
      <p className="muted-text">{element.field_description}</p>
    </StyledDiv>
  );
}
