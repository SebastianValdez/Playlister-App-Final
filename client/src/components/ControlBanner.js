import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";

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
import { height } from "@mui/system";

export default function ControlBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSortListsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortListsMenuClose = () => {
    setAnchorEl(null);
  };

  const sortListsMenu = (
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
      <MenuItem onClick={handleSortListsMenuClose}>
        <Link to="">Name (A - Z)</Link>
      </MenuItem>
      <MenuItem onClick={handleSortListsMenuClose}>
        <Link to="">Publish Date (Newest)</Link>
      </MenuItem>
      <MenuItem onClick={handleSortListsMenuClose}>
        <Link to="">Listens (High - Low)</Link>
      </MenuItem>
      <MenuItem onClick={handleSortListsMenuClose}>
        <Link to="">Likes (High - Low)</Link>
      </MenuItem>
      <MenuItem onClick={handleSortListsMenuClose}>
        <Link to="">Dislikes (High - Low)</Link>
      </MenuItem>
    </Menu>
  );

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
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
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
              >
                <GroupOutlinedIcon sx={{ fontSize: 40 }}></GroupOutlinedIcon>
              </Link>
            </Typography>
          </Box>

          {/* // ! SEARCH BAR */}
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            style={{ backgroundColor: "white" }}
            sx={{ width: "700px" }}
          />

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
              <MenuOutlinedIcon
                sx={{ fontSize: 40 }}
                onClick={handleSortListsMenuOpen}
              ></MenuOutlinedIcon>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {}
    </Box>
  );
}
