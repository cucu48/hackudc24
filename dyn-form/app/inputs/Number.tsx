import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";


export default function Number(props: {element: any, setInputValues: any, inputValues: any}) {
  const { element, setInputValues, inputValues } = props;  
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
        type="number"
        onChange={(event) => handleInputChange(event, element, setInputValues, inputValues)}
        required={element.field_required}
        disabled={element.field_readonly}
        // add an OPTIONAL attibute to the minimum value
        min={element.field_validations.min_value}
        // add an OPTIONAL attibute to the maximum value
        max={element.field_validations.max_value}
      />
      <p className="muted-text">{element.field_description}</p>
    </StyledDiv>);
}