import styled from "styled-components";
import { RiDeleteBack2Fill } from "react-icons/ri";
import React, { Dispatch, SetStateAction, useState } from "react";

const CalculatorContainer = styled.div`
  padding-top: 30vh;
  margin-left: 35vw;
  width: 30vw;
  height: 30vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

interface ButtonProps {
  el: string | number | null;
  isPressed: boolean;
}
const CalculatorButton = styled.button<ButtonProps>`
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

const calculatorArr = [
  "C",
  "=",
  <RiDeleteBack2Fill color="red" />,
  "*",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
];

interface Props {
  screen: string | undefined;
  setScreen: Dispatch<SetStateAction<string | undefined>>;
  //   setScreen: any;
}

const CalculatorButtons = ({ screen, setScreen }: Props) => {
  // screen에 숫자가나오는 함수
  const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(eventTarget.innerText);
    const eventTarget = e.target as HTMLElement;
    if (isNaN(Number(eventTarget.innerText))) {
      // 숫자가 아닌 기호를 클릭
      if (eventTarget.innerText === "C") {
        setScreen("");
      } else if (eventTarget.innerText === undefined) {
        setScreen(screen?.slice(0, -1)); // 지우기 클릭
      } else if (eventTarget.innerText === "=") {
        // 결과 값
        if (screen?.length !== 0) {
          let sum = new Function(`return ${screen}`);
          setScreen(sum().toString());
        }
      } else {
        if (screen) {
          if (isNaN(Number(screen[screen.length - 1]))) {
            setScreen((prevState) => prevState?.slice(0, -1));
            setScreen((prevState) => prevState + eventTarget.innerText);
          } else {
            setScreen(screen + eventTarget.innerText);
          }
        }
      }
    } else if (eventTarget.innerText?.length === 0) {
      setScreen(screen?.slice(0, -1));
    } else {
      setScreen(screen + eventTarget.innerText);
    }
  };

  window.onkeydown = (e: KeyboardEvent) => {
    // console.log(calculatorArr.includes(e.key));
    setPressedKey(e.key);
    if (calculatorArr.includes(e.key)) {
      if (isNaN(Number(e.key))) {
        if (e.key === "C") {
          setScreen("");
        } else if (e.key === "=") {
          if (screen?.length !== 0) {
            let sum = new Function(`return ${screen}`);
            setScreen(sum().toString());
          }
        } else {
          if (screen) {
            if (isNaN(Number(screen[screen.length - 1]))) {
              setScreen((prevState) => prevState?.slice(0, -1));
              setScreen((prevState) => prevState + e.key);
            } else {
              setScreen(screen + e.key);
            }
          }
        }
      } else if (e.key?.length === 0) {
        setScreen(screen?.slice(0, -1));
      } else {
        setScreen(screen + e.key);
      }
    }

    if (e.key === "Enter") {
      if (screen?.length !== 0) {
        let sum = new Function(`return ${screen}`);
        setScreen(sum().toString());
      }
    }
    if (e.key === "Escape" || e.key === "c") {
      setScreen("");
    }
    if (e.key === "Backspace") {
      setScreen(screen?.slice(0, -1));
    }
  };
  const [pressedKey, setPressedKey] = useState("");
  return (
    <div>
      <CalculatorContainer>
        {calculatorArr.map((el, index) => {
          return (
            <CalculatorButton
              onClick={clickButton}
              key={index}
              el={typeof el === "string" ? el : null}
              isPressed={pressedKey === el}
            >
              {el}
            </CalculatorButton>
          );
        })}
      </CalculatorContainer>
    </div>
  );
};

export default CalculatorButtons;
