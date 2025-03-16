import { calculatorArr } from "constants/calculatorButton";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CalculatorButton, CalculatorContainer } from "styles/calculator.style";
import { calculateExpression } from "utils/calculator";

interface Props {
  screen: string | undefined;
  setScreen: Dispatch<SetStateAction<string | undefined>>;
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
          const sum = calculateExpression(screen as string);
          setScreen(sum.toString());
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
            const sum = calculateExpression(screen as string);
            setScreen(sum.toString());
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
