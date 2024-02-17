import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";


export default function Number(props: {element: any, setInputValues: any, inputValues: any}) {
  const { element, setInputValues, inputValues } = props;  
  const inputId = "inp" + element.field_id;

    return (
    <StyledDiv
      className="mb-3"
      id={element.field_id}
      key={element.field_id}
      display={element.field_dependent_on}
    >
      <label for={inputId} className="form-label">{element.field_name}</label>
      <p className="mb-1 text-black-50">{element.field_description}</p>
      <input
        id={inputId}
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
    </StyledDiv>);
}