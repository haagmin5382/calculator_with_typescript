import styled from "styled-components";
import { useState } from "react";
import CalculatorButtons from "components/CalculatorButton";

const CalculatorBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  color: white;
`;

const ScreenContainer = styled.div`
  position: absolute;
  top: 5vh;
  left: 35vw;
  background-color: white;
  border-radius: 20px;
  color: black;
  text-align: center;
  width: 30vw;
  height: 20vh;
`;

function Calculator() {
  const [screen, setScreen] = useState<string | undefined>("");

  // typescript에서 state의 type을 지정할 때에는 generics안에 타입을 지정해주면 된다. useState<number>()
  // 초기값을 지정해주면 알아서 타입을 유추하기 때문에 굳이 지정해주지 않아도 무방하긴 하다. (타입 추론)
  // 하지만 타입이 여러가지가 나올 수 있는 state는 generics를 사용하는 것이 좋다.
  return (
    <CalculatorBackground>
      <ScreenContainer>{screen}</ScreenContainer>
      <CalculatorButtons screen={screen} setScreen={setScreen} />
    </CalculatorBackground>
  );
}

export default Calculator;
