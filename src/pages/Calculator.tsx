import styled from "styled-components";
import { useState } from "react";
import CalculatorButtons from "components/CalculatorButton";
import { CalculatorBackground, ScreenContainer } from "styles/calculator.style";

function Calculator() {
  const [screen, setScreen] = useState<string | undefined>("");

  return (
    <CalculatorBackground>
      <ScreenContainer>
        {screen?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
      </ScreenContainer>
      <CalculatorButtons screen={screen} setScreen={setScreen} />
    </CalculatorBackground>
  );
}

export default Calculator;
