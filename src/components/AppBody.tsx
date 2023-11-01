import { Box, Typography } from "@mui/material";
import React from "react";
import { observer } from "mobx-react";
import { useAppStore } from "../services/app";
import Users from "./Users";
import SingleUser from "./SingleUser";

const AppBody: React.FC = () => {
  const appStore = useAppStore();

  return (
    <Box
      sx={{
        paddingLeft: "25%",
        paddingRight: "25%",
        display: "flex",
        justifyContent: "center",
        mt: "16px",
        height: "calc(100% - 16px - 64px)",
      }}
    >
      {!appStore?.users?.length &&
      !appStore?.showFavorites &&
      !appStore?.usersLoading ? (
        <Typography variant="body1">No search results ...</Typography>
      ) : appStore?.selectedUser != null ? (
        <SingleUser />
      ) : (
        <Users />
      )}
    </Box>
  );
};

export default observer(AppBody);
