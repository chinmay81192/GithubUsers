import { AppBar, Toolbar } from "@mui/material";
import React from "react";

const AppHeader: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default AppHeader;
