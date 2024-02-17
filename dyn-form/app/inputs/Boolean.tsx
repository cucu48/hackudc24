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
      <label for={inputId} className="form-label">
        {element.field_name}
      </label>
      <p className="mb-1 text-black-50">{element.field_description}</p>
      <input
        id={inputId}
        className="form-control"
        type="checkbox"
        required={element.field_required}
        disabled={element.field_readonly}
        onChange={(event) =>
          handleInputChange(event, element, setInputValues, inputValues)
        }
      />
    </StyledDiv>
  );
}
