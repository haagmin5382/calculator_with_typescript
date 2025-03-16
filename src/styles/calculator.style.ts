import styled from "styled-components";
interface ButtonProps {
  el: string | number | null;
  isPressed: boolean;
}
export const CalculatorBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  color: white;
`;

export const ScreenContainer = styled.div`
  position: absolute;
  top: 5vh;
  left: 35vw;
  background-color: white;
  border-radius: 20px;
  color: black;
  text-align: center;
  width: 30vw;
  height: 20vh;
  font-size: 2vw;
`;

export const CalculatorContainer = styled.div`
  padding-top: 30vh;
  margin-left: 35vw;
  width: 30vw;
  height: 30vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const CalculatorButton = styled.button<ButtonProps>`
  /* background-color: #ebdfee; */
  background-color: ${(props) => {
    if (props.isPressed) {
      return "#FFFBF0";
    }
    if (props.el === "C") {
      return "#FA848D";
    }
    if (props.el === "=") {
      return "#84A4FA";
    } else {
      return "#ebdfee";
    }
  }};
  box-shadow: 1px 2px;
  border: none;
  border-radius: 20px;
  margin: 2px;
  color: #646c6f;
  font-weight: bold;
  font-size: 2vw;
  cursor: pointer;

  :hover {
    background-color: ${(props) => {
      if (props.el === "C") {
        return "#F72F3E";
      }
      if (props.el === "=") {
        return "#1768FF";
      } else {
        return "#F8F0FF";
      }
    }};
  }
`;
