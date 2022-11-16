import { useContext } from "react";
import { GlobalStoreContext } from "../store";

import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
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
          <FastRewindIcon sx={{ fontSize: 50 }}></FastRewindIcon>
          <StopIcon sx={{ fontSize: 50 }}></StopIcon>
          <PlayArrowIcon sx={{ fontSize: 50 }}></PlayArrowIcon>
          <FastForwardIcon sx={{ fontSize: 50 }}></FastForwardIcon>
        </Box>
      </div>
    </div>
  );
}
