import React, { useState } from "react";
import {Table} from "./Components/Table/Table";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes";
import "./App.css";
const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  //TODO: make ThemeProvider
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Table theme={theme} themeToggler={themeToggler}/>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
