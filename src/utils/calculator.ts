export function calculateExpression(expression: string): number {
  // 먼저 공백을 제거한다.
  const sanitized = expression?.replace(/\s+/g, "");

  // 숫자와 연산기호(+, -, *, /)만 허용 (기타 문자가 들어온 경우 예외 처리)
  if (!/^[0-9+\-*/.]+$/.test(sanitized)) {
    throw new Error("식에 허용되지 않는 문자가 포함되어 있습니다.");
  }

  // 연산자와 숫자를 분리하기 위해 정규식을 활용
  // ex) "12+3*4-10/2" -> ["12", "+", "3", "*", "4", "-", "10", "/", "2"]
  const tokens = sanitized.split(/([+\-*/])/).filter(Boolean);

  // 이제 토큰들을 왼쪽부터 순차적으로 연산한다.
  // 계산 과정에서 *, / 먼저 처리 -> 이후 +, - 처리
  // 1. 우선순위가 높은 *, /를 먼저 계산해 tokens를 재구성한다.
  let stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "*" || token === "/") {
      // 직전의 숫자를 stack에서 꺼내와서 현재 연산 수행
      const prevNumber = parseFloat(stack.pop() as string);
      const nextNumber = parseFloat(tokens[++i]);
      let intermediateResult = 0;

      if (token === "*") {
        intermediateResult = prevNumber * nextNumber;
      } else {
        // 0으로 나누는 경우 예외
        if (nextNumber === 0) {
          throw new Error("0으로 나눌 수 없습니다.");
        }
        intermediateResult = prevNumber / nextNumber;
      }
      // 계산 결과를 다시 stack에 넣는다.
      stack.push(intermediateResult);
    } else {
      // 숫자이거나 +, - 연산자는 일단 stack에 넣는다.
      stack.push(token);
    }
  }

  // 2. 이제 stack에 남은 +, - 연산만 처리한다.
  // ex) stack: [5, "+", 3, "-", 2, ...]
  let result = parseFloat(stack[0] as string);
  for (let i = 1; i < stack.length; i += 2) {
    const operator = stack[i];
    const nextNumber = parseFloat(stack[i + 1] as string);
    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "-") {
      result -= nextNumber;
    }
  }

  return result;
}

// 사용 예시
console.log(calculateExpression("12+3*4-10/2")); // 10
console.log(calculateExpression("1+2*3")); // 7
console.log(calculateExpression("10/2+3")); // 8
