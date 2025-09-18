import styled from "styled-components";


interface ButtonProps {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${props => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
`;
