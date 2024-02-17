import { StyledDiv } from "@/app/custom/ui/StyledDiv";
import handleInputChange from "@/app/custom/logic/handleInputChange";

export default function Boolean(props: {
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
      display={element.field_dependent_on}
    >
      {element.field_icon && (
        <i className={element.field_icon} style={{ marginRight: "10px" }}></i>
      )}
      <div className="form-check">
      <label for={inputId} className="form-check-label">
        {element.field_name}
      </label>
        
      <input
        id={inputId}
        className="form-check-input"
        type="checkbox"
        name={inputId}
        required={element.field_required}
        disabled={element.field_readonly}
        onChange={(event) =>
          handleInputChange(event, element, setInputValues, inputValues)
        }
      />
      </div>
      <p className="mb-1 text-black-50">{element.field_description}</p>
    </StyledDiv>
  );
}
