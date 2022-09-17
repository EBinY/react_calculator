import React from "react";
import { useState } from "react";
import {
  MainContainer,
  FuncContainer,
  ButtonContainer,
  Button,
  CalButton,
  InputBar,
} from "./styles";

function Calculator() {
  // 필수 조건
  // 1. 소수점까지 연산 가능한 계산기 기능 구현
  // 2. del 기능: 뒤에서부터 1자리씩 삭제, 숫자 기호 구분 없이
  // 3. 숫자 천단위 구분자 표시
  // 4. ac 기능: 모든 연산 초기화
  // 5. 화면에 선택한 숫자/기호 표시, 등호 누르면 결과값이 계산되어 표시
  // 6. 부호 전환: 양수를 누르면 음수로 전환('(-'를 붙여서 음수 계산을 괄호에 넣어야 함)
  // 7. 괄호 기능 구현
  // 8. 숫자는 최대 12자리까지 입력 가능
  // 기타1. '%' 기능에 대한 조건 없음, 일반 계산기처럼 기능하도록 구현
  // 기타2. 조건 없는 기능들('.', '0나누기')등은 최대한 일반 계산기처럼 구현하도록 할 것

  // state로 계산식을 관리, 등호를 가동하였을 때에 state의 값으로 함수식을 계산하고 결과값으로 다시 대체
  // display값은 state 그대로 사용하면, 등호 등의 문제가 발생하여 최하단에 str로 대체하고 정규식 적용
  // 숫자 12자리 제한 적용 고민, 등호 이전까지의 연속된 숫자가 12자리여야 함
  // 계산 결과 또한 12자리여야 함, 넘어갈 경우 과학적 표기법으로 대체해야 함(필수 x, 추가 사항)

  const [cal, setCal] = useState("");

  // 괄호의 열리고 닫힘을 제어해줄 boolean state를 선언
  const [parOpen, setParOpen] = useState(false);

  // 음수양수 부호 버튼을 제어해야 하는데,

  // 계산식을 구성할 때에, 구분의 조건을 ' '로 잡아서 생각해야 함
  // 스택을 써야하나, 그럼 문제는 del기능을 구현할 때에 문제가 발생할 수 있음
  // 가장 편한 방식은 전체를 문자열로 놓고, 계산식에 특이점이 발생할 때에, ' '전까지만 보고 판별하면
  // 그럼 결국 스택으로 쌓아야 하는데, del 기능을

  const sumNum = (e) => {
    // 숫자 12자리 제한을 구현해야 함
    // ' ' 또는 '.'으로 구분하여 .을 제외한 값이 12개를 넘어가면 입력되지 않도록 제한하자
    let lastBlank = cal.lastIndexOf(" ");
    if (cal.length - lastBlank > 12) {
      return;
    }
    setCal((v) => v + e.target.value);
  };

  const sumOper = (e) => {
    // 부호를 넣을 때에 ' '를 앞, 뒤로 넣어서 숫자와 부호를 구분짓도록 함
    setCal((v) => v + " " + e.target.value + " ");
  };

  const sumDot = (e) => {
    // // dot이 맨 앞에는 붙지 못하도록 해야 함
    // if (cal.length === 0) {
    //   return;
    // }
    // // dot이 한 숫자에서 1개 이상 붙지 못하도록 해야 함
    // if (!cal.includes(".")) {
    //   setCal((v) => v + e.target.value);
    // }
    // 맨 앞 제한, 중간 제한, 숫자 당 1회 제한 등
    // 부가적인 기능은 시간이 나면 추가하도록 하자
    setCal((v) => v + e.target.value);
  };

  // 괄호 버튼은 1개로 되어 있음, 열림과 닫힘이 한버튼으로 구성되야 함
  const sumPar = () => {
    // 오프너가 포함되어 있는지 검색, 오프너가 없다면 오프너를 추가
    // 또한 오프너가 열리고 다시 닫힌 상태라면, 새로운 오프너가 열리도록 조건을 달아야 함
    if (!parOpen) {
      setCal((v) => v + "(");
      setParOpen(true);
    }
    // 안 닫힌 오프너가 있다면 클로저를 추가해야 함
    if (parOpen) {
      setCal((v) => v + " )");
      setParOpen(false);
    }
  };

  const sumPercent = () => {
    let lastBlank = cal.lastIndexOf(" ");
    // per를 적용할 범위를 설정, 범위 내 값을 숫자로 치환하여 /100을 계산하고 다시 붙여넣음
    let str = cal.substring(lastBlank + 1);
    let numPer = Number(str) / 100;
    let perStr = cal.substring(0, lastBlank + 1) + String(numPer);
    setCal(perStr);
  };

  const sumZero = (e) => {
    // 0이 붙을 수 없는 조건인 '%'에서 뒤에 0을 넣는다면
    // 모든 숫자를 초기화하고, alert를 보낸다
    if (cal[cal.length - 2] === "÷" && e.target.value === "0") {
      alert("0으로는 나눌 수 없습니다");
      setCal("");
      return;
    }
    let lastBlank = cal.lastIndexOf(" ");
    // 0이 맨 앞이라면 1개만 추가되도록 해야 함
    if ((cal[0] === "0" || cal[lastBlank + 1] === "0") && !cal.includes(".")) {
      return;
    }
    setCal((v) => v + e.target.value);
  };

  const delCal = () => {
    // del버튼을 사용할 때에 부호일 경우 같이 삽입된 ' '도 함께 삭제
    if (cal[cal.length - 1] === " ") {
      let str = String(cal).slice(0, -3);
      setCal((v) => str);
      return;
    }
    let str = String(cal).slice(0, -1);
    setCal((v) => str);
  };

  const clrCal = () => {
    setCal("");
  };

  const sumMinOrPls = () => {
    let lastBlank = cal.lastIndexOf(" ");
    // 숫자가 양수라면 '(-'를 추가
    if (cal[lastBlank + 1] !== "-") {
      let str =
        cal.substring(0, lastBlank + 1) + "( -" + cal.substring(lastBlank + 1);
      setCal(str);
      setParOpen(true);
      return;
    }
    // 숫자가 음수라면 '(-'를 제거
    if (cal[lastBlank + 1] === "-") {
      let str = cal.substring(0, lastBlank - 1) + cal.substring(lastBlank + 2);
      setCal(str);
      setParOpen(false);
    }
    return;
  };

  // 위의 함수들은 중위 표현식을 만들기 위한 함수들이고
  // calResult는 완성된 중위 표현식을 후위 표현식으로 변환하고, 그 결과를 계산하는 함수
  const calResult = () => {
    // 입력이 종료된 계산식에서 공백을 제거해준다
    // let str = cal.replace(/(\s*)/g, "");

    // 입력된 연산자들간의 우선순위를 판별할 함수를 작성
    // const operPriority = (oper, stack) => {
    //   // 우선순위가 낮은 순서대로 작성
    //   if (oper === '+' || oper === '-') {
    //     return 1;
    //   } else if (oper === '÷' || oper === '×') {
    //     return 2;
    //   }
    //   // (,)의 경우 open의 경우 가장 순위가 높다
    //   else if (oper === '(')
    // }
    setCal(str);
  };

  // cal을 display상에서 천 단위 구분자를 보여주기 위한 정규식 적용
  let str = cal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <MainContainer>
      <InputBar readOnly value={str} />
      <FuncContainer>
        <Button>다크모드</Button>
        <Button></Button>
        <Button></Button>
        <Button onClick={delCal}>DEL</Button>
      </FuncContainer>
      <ButtonContainer>
        <Button onClick={clrCal}>C</Button>
        <Button value="()" onClick={sumPar}>
          ()
        </Button>
        <CalButton value="%" onClick={sumPercent}>
          %
        </CalButton>
        <CalButton value="÷" onClick={sumOper}>
          ÷
        </CalButton>
        <Button value={7} onClick={sumNum}>
          7
        </Button>
        <Button value={8} onClick={sumNum}>
          8
        </Button>
        <Button value={9} onClick={sumNum}>
          9
        </Button>
        <CalButton value="×" onClick={sumOper}>
          ×
        </CalButton>
        <Button value={4} onClick={sumNum}>
          4
        </Button>
        <Button value={5} onClick={sumNum}>
          5
        </Button>
        <Button value={6} onClick={sumNum}>
          6
        </Button>
        <CalButton value="-" onClick={sumOper}>
          -
        </CalButton>
        <Button value={1} onClick={sumNum}>
          1
        </Button>
        <Button value={2} onClick={sumNum}>
          2
        </Button>
        <Button value={3} onClick={sumNum}>
          3
        </Button>
        <CalButton value="+" onClick={sumOper}>
          +
        </CalButton>
        <Button onClick={sumMinOrPls}>+/-</Button>
        <Button value={0} onClick={sumZero}>
          0
        </Button>
        <Button value="." onClick={sumDot}>
          .
        </Button>
        <CalButton onClick={calResult}>=</CalButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default Calculator;
