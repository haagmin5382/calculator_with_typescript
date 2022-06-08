import styled from "styled-components";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react";

const CalculatorContainer = styled.div`
  padding-top: 30vh;
  margin-left: 35vw;
  width: 30vw;
  height: 30vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const CalculatorButton = styled.button`
  background-color: ivory;
  color: blue;
  font-weight: bold;
`;

const calculatorArr = [
  "C",
  "/",
  <RiDeleteBack2Fill color="red" />,
  "X",
  7,
  8,
  9,
  "÷",
  4,
  5,
  6,
  "+",
  1,
  2,
  3,
  "-",
  0,
  ".",

  "=",
];

interface Props {
  screen: string | undefined;
  setScreen: Dispatch<SetStateAction<string | undefined>>;
  //   setScreen: any;
}

const CalculatorButtons = ({ screen, setScreen }: Props) => {
  const clickButton = (e: any) => {
    if (e.target.innerText === "C") {
      setScreen("");
    } else if (e.target.innerText === "" || e.target.innerText === undefined) {
      setScreen(screen?.slice(0, -1));
    } else if (e.target.innerText === "=") {
    } else {
      setScreen(screen + e.target.innerText);
    }
  };

  return (
    <div>
      <CalculatorContainer>
        {calculatorArr.map((el, index) => {
          return (
            <CalculatorButton onClick={clickButton} key={index}>
              {el}
            </CalculatorButton>
          );
        })}
      </CalculatorContainer>
    </div>
  );
};

export default CalculatorButtons;
