import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";

  
export default function Date(props: {element: any, setInputValues: any, inputValues: any}) {
    const { element } = props;  
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
            type="date"
            min={element.field_validations.min_value}
            max={element.field_validations.max_value}
            disabled={element.field_readonly}
            required={element.field_required}
            onChange={(event) => handleInputChange(event, element, setInputValues, inputValues)}
        />
        <p className="muted-text">{element.field_description}</p>
        </StyledDiv>
    );
}