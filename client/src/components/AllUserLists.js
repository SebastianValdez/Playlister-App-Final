import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import VideoPlayer from "./VideoPlayer";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AllUserLists() {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ width: "90%", left: "5%", bgcolor: "mint" }}>
        {store.idNamePairs.map((pair) => (
          <ListCard key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
  }

  return (
    <div id="playlist-selector">
      <div id="list-selector-list">
        {listCard}
        <MUIDeleteModal />
      </div>
      <div id="youtube-comment-component">
        <div id="video-comments-buttons">
          <Button variant="contained" style={{ backgroundColor: "black" }}>
            Player
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            sx={{ ml: "3px" }}
          >
            Comments
          </Button>
        </div>
        <VideoPlayer />
      </div>
    </div>
  );
}
