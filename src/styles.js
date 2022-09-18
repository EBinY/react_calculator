import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 800px;
  width: 360px;
  border: 2px solid #eaeaea;
  background-color: ${(props) => props.theme.bgColor};
`;

export const DisplayBox = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 320px;
  height: 200px;
  margin-bottom: 10px;
  border: none;
  font-size: 40px;
  text-align: right;
  padding-right: 20px;
  resize: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
  &:focus {
    outline: none;
  }
`;

export const FuncContainer = styled.div`
  display: grid;
  width: 320px;
  height: 80px;
  border-bottom: 1.5px solid #eaeaea;
  margin: 0px 0px 10px 0px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: grid;
  width: 330px;
  height: 358px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const Button = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  border: none;
  font-size: 2rem;
  font-weight: lighter;
  border-radius: 35px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.color};
  &:active {
    background-color: ${(props) => props.theme.btnClickColor};
  }
`;

export const ModButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  border: none;
  color: ${(props) => props.theme.color};
  font-size: 0.7rem;
  font-weight: lighter;
  cursor: pointer;
`;

export const DelButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  border: none;
  color: #52951b;
  font-size: 2rem;
  font-weight: lighter;
  cursor: pointer;
`;

export const CalButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #f2f3f5;
  border: none;
  color: #52951b;
  font-size: 2rem;
  font-weight: lighter;
  border-radius: 35px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  &:active {
    background-color: ${(props) => props.theme.btnClickColor};
  }
`;

export const ClrButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #f2f3f5;
  border: none;
  color: #d87055;
  font-size: 2rem;
  font-weight: lighter;
  border-radius: 35px;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnColor};
  &:active {
    background-color: ${(props) => props.theme.btnClickColor};
  }
`;

export const EquButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #69b41b;
  border: none;
  color: white;
  font-size: 2.5rem;
  font-weight: lighter;
  border-radius: 35px;
  cursor: pointer;
  &:active {
    background-color: #52951b;
  }
`;
