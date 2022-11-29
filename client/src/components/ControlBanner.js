import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";
import { useLocation } from "react-router-dom";

import EditToolbar from "./EditToolbar";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function ControlBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState("");
  const isMenuOpen = Boolean(anchorEl);

  const handleSortListsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortListsMenuClose = () => {
    setAnchorEl(null);
  };

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      store.setSearchFilter(text);
      setText("");
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let sortListsMenu = "";
  if (location.pathname == "/currentUserLists") {
    sortListsMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleSortListsMenuClose}
      >
        <MenuItem onClick={() => store.setSortType("creation date")}>
          By Creation Date (Old - New)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("update date")}>
          By Last Edit Date (New - Old)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("name")}>
          By Name (A - Z)
        </MenuItem>
      </Menu>
    );
  } else {
    sortListsMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleSortListsMenuClose}
      >
        <MenuItem onClick={() => store.setSortType("name")}>
          Name (A - Z)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("publish date")}>
          Publish Date (Newest)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("listens")}>
          Listens (High - Low)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("likes")}>
          Likes (High - Low)
        </MenuItem>
        <MenuItem onClick={() => store.setSortType("dislikes")}>
          Dislikes (High - Low)
        </MenuItem>
      </Menu>
    );
  }

  let textFieldLabel = "";
  if (
    location.pathname === "/currentUserLists" ||
    location.pathname === "/allLists"
  ) {
    textFieldLabel = "Search for Playlists";
  } else if (location.pathname === "/userLists") {
    textFieldLabel = "Search for Users";
  }

  if (
    location.pathname !== "/" &&
    location.pathname !== "/login/" &&
    location.pathname !== "/register/"
  ) {
    // ! WE DONT SHOW THIS BAR ON THE SPLASH SCREEN
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "black" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* // ! Box that holds the three buttons for navigation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "130px",
              }}
            >
              {/* // ! HOME BUTTON */}
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/currentUserLists"
                  onClick={() => {
                    store.removeClickedList();
                    store.closeCurrentList();
                    store.setSearchFilter("");
                    store.setSortType(null);
                  }}
                >
                  <HomeOutlinedIcon sx={{ fontSize: 40 }}></HomeOutlinedIcon>
                </Link>
              </Typography>

              {/* // ! USER LISTS */}
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/userLists"
                  onClick={() => {
                    store.removeClickedList();
                    store.closeCurrentList();
                    store.setSearchFilter("");
                    store.setSortType(null);
                  }}
                >
                  <PersonOutlineOutlinedIcon
                    sx={{ fontSize: 40 }}
                  ></PersonOutlineOutlinedIcon>
                </Link>
              </Typography>

              {/* // ! ALL LISTS */}
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/allLists"
                  onClick={() => {
                    store.removeClickedList();
                    store.closeCurrentList();
                    store.setSearchFilter("");
                    store.setSortType(null);
                  }}
                >
                  <GroupOutlinedIcon sx={{ fontSize: 40 }}></GroupOutlinedIcon>
                </Link>
              </Typography>
            </Box>

            {/* // ! SEARCH BAR */}
            {location.pathname !== "/currentUserLists" ? (
              <TextField
                id="filled-basic"
                label={textFieldLabel}
                variant="filled"
                defaultValue={text}
                value={text}
                style={{ backgroundColor: "white" }}
                sx={{ width: "700px" }}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
              />
            ) : (
              <Box></Box>
            )}
            {/* // ! SORT MENU */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <IconButton
                  style={{ color: "white" }}
                  onClick={handleSortListsMenuOpen}
                  sx={{ left: "5px", bottom: "4px" }}
                >
                  <MenuOutlinedIcon sx={{ fontSize: 40 }}></MenuOutlinedIcon>
                </IconButton>
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        {sortListsMenu}
      </Box>
    );
  } else {
    return null;
  }
}
