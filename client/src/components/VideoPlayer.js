import { useContext } from "react";
import { GlobalStoreContext } from "../store";

import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import IconButton from "@mui/material/IconButton";
import { borderRadius } from "@mui/system";

export default function VideoPlayer() {
  return (
    <div id="video-player-container">
      <div id="video-player"></div>
      <div id="now-playing">Now Playing</div>
      <div id="youtube-song-info">
        <span>Playlist:</span>
        <span>Song:</span>
        <span>Title:</span>
        <span>Artist:</span>
      </div>
      <div id="video-controls">
        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton style={{ color: "black" }}>
            <FastRewindIcon sx={{ fontSize: 50 }}></FastRewindIcon>
          </IconButton>

          <IconButton style={{ color: "black" }}>
            <StopIcon sx={{ fontSize: 50 }}></StopIcon>
          </IconButton>

          <IconButton style={{ color: "black" }}>
            <PlayArrowIcon sx={{ fontSize: 50 }}></PlayArrowIcon>
          </IconButton>

          <IconButton style={{ color: "black" }}>
            <FastForwardIcon sx={{ fontSize: 50 }}></FastForwardIcon>
          </IconButton>
        </Box>
      </div>
    </div>
  );
}
