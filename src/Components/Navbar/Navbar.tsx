import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";


const Navbar = () => {

  return (
    // <AppBar position="static" style={{background:'rgba(247,250,252,var(--bg-opacity))'}}>
    <AppBar position="static" style={{backgroundColor: "#a4a88f62"}}>
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          👋🏼
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
