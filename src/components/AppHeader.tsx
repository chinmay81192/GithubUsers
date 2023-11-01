import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  alpha,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDebounced } from "../hooks/useDebounce";
import { observer } from "mobx-react";
import { useAppStore } from "../services/app";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "gray",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AppHeader: React.FC = () => {
  const appStore = useAppStore();
  const debouncedValue = useDebounced(appStore?.search ?? "");

  useEffect(() => {
    appStore?.resetUsers();
    appStore?.setCurrentPage(1);
  }, [debouncedValue, appStore]);

  useEffect(() => {
    if (appStore?.showFavorites) {
      appStore?.filterfavorites(debouncedValue);
    } else {
      if (debouncedValue?.length >= 3) {
        appStore
          ?.fetchUsers(debouncedValue, appStore?.currentPage)
          .then((data) => console.log(data));
      }
    }
  }, [debouncedValue, appStore]);

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "gray" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for Github users ..."
            inputProps={{ "aria-label": "search" }}
            value={appStore?.search}
            onChange={(e) => appStore?.setSearch(e.target.value)}
          />
        </Search>
        <IconButton
          onClick={() => appStore?.setShowFavorite(!appStore.showFavorites)}
        >
          <StarBorderIcon
            sx={{
              color: appStore?.showFavorites ? "gold" : "lightgray",
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default observer(AppHeader);
