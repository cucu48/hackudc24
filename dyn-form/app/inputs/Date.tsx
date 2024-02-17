import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";

  
export default function Date(props: {element: any, setInputValues: any, inputValues: any}) {
    const { element } = props;  
    const inputId = "inp" + element.field_id;
    return (
        <StyledDiv
        id={element.field_id}
        className="mb-3"
        key={element.field_id}
        display={element.field_dependent_on}
        >
        <label for={inputId} className="form-label">{element.field_name}</label>
        <p className="mb-1 text-black-50">{element.field_description}</p>
        <input
            id={inputId}
            className="form-control"
            type="date"
            min={element.field_validations.min_value}
            max={element.field_validations.max_value}
            disabled={element.field_readonly}
            required={element.field_required}
            onChange={(event) => handleInputChange(event, element, setInputValues, inputValues)}
        />
        </StyledDiv>
    );
}