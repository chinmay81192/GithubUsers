import React from "react";
import { AppStore } from "./services/app/index";
import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";
import AppBody from "./components/AppBody";

function App() {
  return (
    <AppStore>
      <Box
        sx={{ width: "100vw", height: "100vh", backgroundColor: "lightgray" }}
      >
        <AppHeader />
        <AppBody />
      </Box>
    </AppStore>
  );
}

export default App;
