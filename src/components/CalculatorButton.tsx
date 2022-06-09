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
  "=",
  <RiDeleteBack2Fill color="red" />,
  "*",
  7,
  8,
  9,
  "/",
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
];

interface Props {
  screen: string | undefined;
  setScreen: Dispatch<SetStateAction<string | undefined>>;

  //   setScreen: any;
}

const CalculatorButtons = ({ screen, setScreen }: Props) => {
  // screen에 숫자가나오는 함수
  const clickButton = (e: any) => {
    // console.log(e.target.innerText);
    if (isNaN(Number(e.target.innerText))) {
      if (e.target.innerText === "C") {
        setScreen("");
      } else if (e.target.innerText === undefined) {
        setScreen(screen?.slice(0, -1));
      } else if (e.target.innerText === "=") {
        let sum = new Function(`return ${screen}`);

        setScreen(sum().toString());
      } else {
        if (screen) {
          if (isNaN(Number(screen[screen.length - 1]))) {
            setScreen((prevState) => prevState?.slice(0, -1));
            setScreen((prevState) => prevState + e.target.innerText);
          } else {
            setScreen(screen + e.target.innerText);
          }
        }
      }
    } else if (e.target.innerText?.length === 0) {
      setScreen(screen?.slice(0, -1));
    } else {
      setScreen(screen + e.target.innerText);
    }
    console.log(screen);
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
