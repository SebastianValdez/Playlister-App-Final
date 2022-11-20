import { useContext } from "react";
import { GlobalStoreContext } from "../store";
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
  const location = useLocation();

  function handleCreateNewList() {
    store.createNewList();
  }

  let text = "";
  if (store.currentList) {
    text = store.currentList.name;
  } else {
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
  }

  if (location.pathname === "/currentUserLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h4">{text}</Typography>
      </div>
    );
  } else if (location.pathname === "/userLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h4">{text}</Typography>
      </div>
    );
  } else if (location.pathname === "/allLists") {
    return (
      <div id="playlister-statusbar">
        <Typography variant="h4">{text}</Typography>
      </div>
    );
  } else {
    return null;
  }
}

export default Statusbar;
