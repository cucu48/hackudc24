export default function handleInputChange(event: any, element: any, setInputValues: any, inputValues: any) {
    const elem = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [element.field_id]: [elem.value, element],
    }));
  }