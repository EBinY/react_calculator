import React from "react";
import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { BsMoonFill } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import {
  MainContainer,
  FuncContainer,
  ButtonContainer,
  Button,
  ModButton,
  DelButton,
  CalButton,
  ClrButton,
  EquButton,
  DisplayBox,
} from "./Styles";

function Calculator({ isDarkMode, toggleDarkMode }) {
  const [cal, setCal] = useState("");
  const [parOpen, setParOpen] = useState(false);

  const sumNum = (e) => {
    let lastBlank = cal.lastIndexOf(" ");
    if (cal.length - lastBlank > 12) {
      return;
    }
    setCal((v) => v + e.target.value);
  };

  const sumOper = (e) => {
    setCal((v) => v + " " + e.target.value + " ");
  };

  const sumDot = (e) => {
    setCal((v) => v + e.target.value);
  };

  const sumPar = () => {
    if (!parOpen) {
      setCal((v) => v + "( ");
      setParOpen(true);
    }
    if (parOpen) {
      setCal((v) => v + " )");
      setParOpen(false);
    }
  };

  const sumPercent = () => {
    let lastBlank = cal.lastIndexOf(" ");
    let str = cal.substring(lastBlank + 1);
    let numPer = Number(str) / 100;
    let perStr = cal.substring(0, lastBlank + 1) + String(numPer);
    setCal(perStr);
  };

  const sumZero = (e) => {
    if (cal[cal.length - 2] === "÷" && e.target.value === "0") {
      alert("0으로는 나눌 수 없습니다");
      setCal("");
      return;
    }
    let lastBlank = cal.lastIndexOf(" ");
    if ((cal[0] === "0" || cal[lastBlank + 1] === "0") && !cal.includes(".")) {
      return;
    }
    setCal((v) => v + e.target.value);
  };

  const delCal = () => {
    if (cal[cal.length - 1] === " ") {
      let str = String(cal).slice(0, -3);
      setCal((v) => str);
      return;
    }
    if (cal[cal.length - 1] === "(") {
      setParOpen(false);
      let str = String(cal).slice(0, -1);
      setCal((v) => str);
      return;
    }
    let str = String(cal).slice(0, -1);
    setCal((v) => str);
  };

  const clrCal = () => {
    setCal("");
    setParOpen(false);
  };

  const sumMinOrPls = () => {
    let lastBlank = cal.lastIndexOf(" ");
    if (cal[lastBlank + 1] !== "-") {
      let str =
        cal.substring(0, lastBlank + 1) + "( -" + cal.substring(lastBlank + 1);
      setCal(str);
      setParOpen(true);
      return;
    }
    if (cal[lastBlank + 1] === "-") {
      let str = cal.substring(0, lastBlank - 1) + cal.substring(lastBlank + 2);
      setCal(str);
      setParOpen(false);
    }
    return;
  };

  const operPriority = (oper, stack) => {
    if (oper === "+" || oper === "-") {
      return 1;
    } else if (oper === "÷" || oper === "×") {
      return 2;
    } else if (oper === "(") {
      if (stack) return 0;
      else return 5;
    } else if (oper === ")") {
      return 4;
    }
  };

  const makePostfix = (e) => {
    const operators = ["(", ")", "+", "-", "×", "÷"];
    const stack = [];
    const result = [];
    e = e.split(" ");
    e.forEach((oper) => {
      if (operators.includes(oper)) {
        if (oper === ")") {
          let pick = stack.pop();
          while (pick !== "(") {
            result.push(pick);
            pick = stack.pop();
          }
        } else {
          if (stack.length === 0) {
            stack.push(oper);
          } else {
            let pick = stack.pop();
            if (operPriority(pick, true) > operPriority(oper, false)) {
              result.push(pick);
            } else {
              stack.push(pick);
            }
            stack.push(oper);
          }
        }
      } else {
        result.push(oper);
      }
    });
    while (stack.length !== 0) {
      result.push(stack.pop());
    }
    return result.join(" ");
  };

  const calPostfix = (e) => {
    const operators = ["+", "-", "×", "÷"];
    const stack = [];
    e.split(" ").forEach((oper) => {
      if (operators.includes(oper)) {
        let num1 = parseFloat(stack.pop());
        let num2 = parseFloat(stack.pop());
        let temp;
        if (oper === "+") temp = num2 + num1;
        else if (oper === "-") temp = num2 - num1;
        else if (oper === "×") temp = num2 * num1;
        else if (oper === "÷") temp = num2 / num1;
        stack.push(temp);
      } else {
        stack.push(oper);
      }
    });
    return stack[0];
  };

  const calResult = () => {
    let str = makePostfix(cal);
    let result = calPostfix(str);
    setCal(result);
  };

  let str = cal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <MainContainer>
      <DisplayBox readOnly maxLength={12} value={str} />
      <FuncContainer>
        <ModButton onClick={toggleDarkMode}>
          {isDarkMode ? (
            <>
              <FcIdea /> 노말 모드
            </>
          ) : (
            <>
              <BsMoonFill /> 다크 모드
            </>
          )}
        </ModButton>
        <ModButton></ModButton>
        <ModButton></ModButton>
        <DelButton onClick={delCal}>
          <FiDelete />
        </DelButton>
      </FuncContainer>
      <ButtonContainer>
        <ClrButton onClick={clrCal}>C</ClrButton>
        <CalButton value="()" onClick={sumPar}>
          ()
        </CalButton>
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
        <EquButton onClick={calResult}>=</EquButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default Calculator;
