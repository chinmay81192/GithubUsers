import {
  Avatar,
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { useAppStore } from "../services/app";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import { User } from "../types";

const SingleUser: React.FC = () => {
  const appStore = useAppStore();

  const numFollow = useCallback((title: string, num: number) => {
    return (
      <Box
        sx={{
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">{num}</Typography>
        <Typography variant="body1" color={"lightgray"}>
          {title}
        </Typography>
      </Box>
    );
  }, []);
  return (
    <Box>
      <Button
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => appStore?.resetSelectedUser()}
        sx={{
          mb: "10px",
        }}
      >
        Back to User List
      </Button>
      <Card
        sx={{
          height: "fit-content",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={appStore?.selectedUser?.avatar_url}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <Box>
            <Typography variant="h5">{appStore?.selectedUser?.name}</Typography>
            <Typography
              variant="body1"
              color={"InfoText"}
            >{`@${appStore?.selectedUser?.login}`}</Typography>
            <Typography variant="body1">
              {appStore?.selectedUser?.bio}
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              {numFollow("Followers", appStore?.selectedUser?.followers ?? 0)}
              {numFollow("Following", appStore?.selectedUser?.following ?? 0)}
              {numFollow("Repos", appStore?.selectedUser?.public_repos ?? 0)}
            </Stack>
          </Box>
          <IconButton
            onClick={(e) => {
              console.log(appStore?.selectedUser);
              appStore?.saveToLocalStorage(appStore?.selectedUser as User);
            }}
            data-testid={"favorites"}
          >
            <StarIcon
              sx={{
                color: appStore?.favorites?.find(
                  (f) => f?.login === appStore?.selectedUser?.login
                )
                  ? "gold"
                  : "lightgray",
              }}
              data-testid={"icon"}
            />
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default observer(SingleUser);
