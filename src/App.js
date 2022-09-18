import React, { useState } from "react";
import Calculator from "./Calculator";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Theme";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Calculator isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </ThemeProvider>
    </>
  );
}

export default App;
