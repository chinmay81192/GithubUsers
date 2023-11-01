import React, { useCallback, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppStore } from "../services/app";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import PullToRefresh from "react-simple-pull-to-refresh";

const Users: React.FC = () => {
  const appStore = useAppStore();
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (appStore?.usersLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && appStore?.hasMoreUsers) {
          appStore?.setCurrentPage(appStore?.currentPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [appStore]
  );

  useEffect(() => {
    if ((appStore?.currentPage ?? 0) > 1) {
      appStore?.fetchUsers(appStore?.search, appStore?.currentPage);
    }
  }, [appStore?.currentPage, appStore]);

  useEffect(() => {
    if (appStore?.favorites?.length === 0) {
      appStore?.getFromLocalStorage();
    }
  }, [appStore]);

  const users = appStore?.showFavorites ? appStore?.favorites : appStore?.users;
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      {users != null && users?.length > 0 ? (
        <PullToRefresh
          onRefresh={() =>
            appStore?.fetchUsers(
              appStore?.search,
              appStore?.currentPage
            ) as Promise<void>
          }
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 720,
              bgcolor: "background.paper",
              maxHeight: "95%",
              overflowY: "auto",
            }}
            onTouchStart={(e) => {
              console.log("Touch started");
            }}
            onTouchEnd={(e) => {
              console.log("Touch ended");
            }}
          >
            {users?.map((user, idx) => (
              <React.Fragment key={user?.login}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => appStore?.fetchSingleUser(user?.login)}
                  ref={idx + 1 === users.length ? lastElementRef : null}
                >
                  <ListItemAvatar>
                    <Avatar alt={user?.login} src={user?.avatar_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`@${user.login}`}
                    secondary={<React.Fragment>{user?.url}</React.Fragment>}
                  />
                  <ListItemIcon>
                    <IconButton
                      onClick={(e) => {
                        appStore?.saveToLocalStorage(user);
                        e.stopPropagation();
                      }}
                    >
                      <StarIcon
                        sx={{
                          color: appStore?.favorites?.find(
                            (f) => f?.login === user?.login
                          )
                            ? "gold"
                            : "lightgray",
                        }}
                      />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </PullToRefresh>
      ) : (
        <></>
      )}

      {appStore?.usersLoading && <CircularProgress />}
    </Box>
  );
};

export default observer(Users);
