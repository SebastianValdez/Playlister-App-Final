import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import { useHistory } from "react-router-dom";

import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import MUIEditSongModal from "./MUIEditSongModal";
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
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  const [videoOrComment, setVideoOrComment] = useState("video");

  // ! The user needs to be either logged in or using a guest account, otherwise redirect
  if (!auth.user) {
    history.push("/");
  }

  useEffect(() => {
    store.getAllPlaylists();
  }, []);

  let listArray = store.playlistsArray.filter(
    (list) => list.published.isPublished
  );

  if (store && store.sortType !== "") {
    listArray = store.sortLists(listArray);
  }

  if (store && store.searchFilter !== "") {
    listArray = store.searchWithFilter("/allLists", listArray);
  }

  let listCard = "";
  if (store) {
    listCard = (
      <List sx={{ width: "90%", left: "5%", bgcolor: "mint" }}>
        {listArray.map((list) => (
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
            style={{ backgroundColor: "black", fontWeight: "bold" }}
            onClick={() => setVideoOrComment("video")}
          >
            Player
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", fontWeight: "bold" }}
            sx={{ ml: "-5px" }}
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
