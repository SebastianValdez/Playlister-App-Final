import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import { useHistory } from "react-router-dom";

import ListCard from "./ListCard.js";
import MUIDeleteModal from "./MUIDeleteModal";
import VideoPlayer from "./VideoPlayer";
import Comments from "./Comments";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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

  let listArray = [];

  if (auth.user) {
    listArray = store.playlistsArray.filter(
      (list) => list.ownerEmail === auth.user.email
    );
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

  if (auth.user === "guest") {
    return (
      <div id="playlist-selector">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{}}
        >
          <Typography
            style={{}}
            sx={{
              width: "90%",
              textAlign: "center",
            }}
            variant="h4"
          >
            Login or create an account to start making playlists today!
            Otherwise click here to view all published playlists, and here to
            view user specific playlists
          </Typography>
        </Box>
      </div>
    );
  } else {
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
  }
};

export default HomeScreen;
