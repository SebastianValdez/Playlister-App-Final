import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import VideoPlayer from "./VideoPlayer";
import Comments from "./Comments";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  const [videoOrComment, setVideoOrComment] = useState("video");

  useEffect(() => {
    store.getAllPlaylists();
  }, []);

  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ width: "90%", left: "5%", bgcolor: "mint" }}>
        {store.playlistsArray.map((list) => (
          <ListCard key={list._id} list={list} selected={false} />
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
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            onClick={() => setVideoOrComment("video")}
          >
            Player
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            sx={{ ml: "3px" }}
            onClick={() => setVideoOrComment("comment")}
          >
            Comments
          </Button>
        </div>
        {videoOrComment === "video" ? <VideoPlayer /> : <Comments />}
      </div>
    </div>
  );
};

export default HomeScreen;
