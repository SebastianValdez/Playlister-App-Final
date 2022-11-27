import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import { useLocation } from "react-router-dom";

import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  function handleCreateNewList() {
    store.createNewList();
  }

  let text = "";
  if (location.pathname === "/currentUserLists") {
    text = (
      <div id="list-selector-heading">
        <Fab
          aria-label="add"
          id="add-list-button"
          onClick={handleCreateNewList}
        >
          <AddIcon />
        </Fab>
        <Typography variant="h2">Your Lists</Typography>
      </div>
    );
  } else if (location.pathname === "/userLists") {
    text = store.searchFilter = "'s";
  } else {
    text = store.searchFilter;
  }

  if (auth.user === "guest") text = "";

  if (location.pathname === "/currentUserLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h4">{text}</Typography>
      </div>
    );
  } else if (location.pathname === "/userLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h2">{text} Lists</Typography>
      </div>
    );
  } else if (location.pathname === "/allLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h2">{text} Playlists</Typography>
      </div>
    );
  } else {
    return null;
  }
}

export default Statusbar;
