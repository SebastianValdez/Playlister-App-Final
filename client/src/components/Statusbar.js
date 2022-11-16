import { useContext } from "react";
import { GlobalStoreContext } from "../store";

import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);

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

  if (true) {
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
