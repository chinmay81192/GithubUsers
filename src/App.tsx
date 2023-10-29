import React from "react";
import { AppStore } from "./services/app/index";
import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <AppStore>
      <Box
        sx={{ width: "100vw", height: "100vh", backgroundColor: "lightgray" }}
      >
        <AppHeader />
      </Box>
    </AppStore>
  );
}

export default App;
