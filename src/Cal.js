import React from "react";
import { useState } from "react";
import {
  MainContainer,
  ButtonContainer,
  Button,
  CalButton,
  ZeroButton,
  InputBar,
} from "./styles";

function Cal() {
  const [calc, setCalc] = useState("");
  const [operCheck, setOperCheck] = useState(true);
  const [pointCheck, setPointCheck] = useState(true);

  const getNum = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(true);
  };

  const getOper = (e) => {
    if (operCheck) {
      setCalc((prev) => prev + e.target.value);
      setOperCheck(false);
    }
  };

  const getPoint = (e) => {
    if (calc.length === 0) {
      return;
    }
    if (pointCheck) {
      setCalc((prev) => prev + e.target.value);
      setPointCheck(false);
    }
  };

  const getResult = () => {
    let replace_str = calc.replace(/×/gi, "*").replace(/÷/gi, "/");

    if (isNaN(eval(replace_str))) {
      setCalc("");
    } else if (eval(replace_str) == Infinity) {
      alert("0으로 나눌수 없습니다.");
      setCalc("");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
    }
  };

  const delCalc = () => {
    setPointCheck(true);
    setOperCheck(true);
    let str = String(calc).slice(0, -1);
    setCalc((prev) => str);
  };

  const allClear = () => {
    setPointCheck(true);
    setCalc((prev) => "");
  };

  return (
    <MainContainer>
      <InputBar readOnly value={calc} />
      <ButtonContainer>
        <Button onClick={allClear}>AC</Button>
        <Button onClick={delCalc}>DEL</Button>
        <CalButton value="%" onClick={getOper}>
          %
        </CalButton>
        <CalButton value="÷" onClick={getOper}>
          ÷
        </CalButton>
        <Button value={7} onClick={getNum}>
          7
        </Button>
        <Button value={8} onClick={getNum}>
          8
        </Button>
        <Button value={9} onClick={getNum}>
          9
        </Button>
        <CalButton value="×" onClick={getOper}>
          ×
        </CalButton>
        <Button value={4} onClick={getNum}>
          4
        </Button>
        <Button value={5} onClick={getNum}>
          5
        </Button>
        <Button value={6} onClick={getNum}>
          6
        </Button>
        <CalButton value="-" onClick={getOper}>
          -
        </CalButton>
        <Button value={1} onClick={getNum}>
          1
        </Button>
        <Button value={2} onClick={getNum}>
          2
        </Button>
        <Button value={3} onClick={getNum}>
          3
        </Button>
        <CalButton value="+" onClick={getOper}>
          +
        </CalButton>
        <ZeroButton value={0} onClick={getNum}>
          0
        </ZeroButton>
        <Button value="." onClick={getPoint}>
          .
        </Button>
        <CalButton onClick={getResult}>=</CalButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default Cal;
