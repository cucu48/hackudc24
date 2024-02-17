import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";


export default function Boolean(props: {element: any, setInputValues: any, inputValues: any}) {
  const { element, setInputValues, inputValues  } = props;  
    return (
    <StyledDiv
      id={element.field_id}
      key={element.field_id}
      display={element.field_dependent_on}
    >
      <label for={"inp"+element.field_id} className="form-label">{element.field_name}</label>
      <input
        id={"inp"+element.field_id}
        className="form-control"
        type="checkbox"
        required={element.field_required}
        disabled={element.field_readonly}
        onChange={(event) => handleInputChange(event, element, setInputValues, inputValues)}
      />
      <p className="muted-text">{element.field_description}</p>
    </StyledDiv>);
}