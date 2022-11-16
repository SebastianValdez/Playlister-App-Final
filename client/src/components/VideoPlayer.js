import { useContext } from "react";
import { GlobalStoreContext } from "../store";

import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

export default function VideoPlayer() {
  return (
    <div>
      <div id="video-player"></div>
      <div id="now-playing">Now Playing</div>
      <div id="youtube-song-info">Playlist: Song: Title: Artist:</div>
      <Box>
        <PlayArrowIcon sx={{ fontSize: 40 }}></PlayArrowIcon>
        <StopIcon sx={{ fontSize: 40 }}></StopIcon>
        <FastForwardIcon sx={{ fontSize: 40 }}></FastForwardIcon>
        <FastRewindIcon sx={{ fontSize: 40 }}></FastRewindIcon>
      </Box>
    </div>
  );
}
