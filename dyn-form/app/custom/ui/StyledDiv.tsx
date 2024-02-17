
import styled from "styled-components";

export const StyledDiv = styled.div`
  display: ${(props: any) => (props.display ? "none" : "block")};
`;