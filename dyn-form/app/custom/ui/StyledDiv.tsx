
import styled from "styled-components";

export const StyledDiv = styled.div`
  //                                  none here   block here
  display: ${(props) => (props.display ? "none" : "block")};
  // remove this line in production
  // background-color: ${(props) => (props.display ? "red" : "blue")};
`;