import { useContext } from "react";
import { GlobalStoreContext } from "../store";

import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import IconButton from "@mui/material/IconButton";
import { borderRadius } from "@mui/system";

import Youtube from "react-youtube";

export default function VideoPlayer() {
  const { store } = useContext(GlobalStoreContext);

  let player = "";
  let playlist = [];
  let currentSong = 0;

  let list = "";
  let listName = "";
  let songTitle = "";
  let songArtist = "";
  if (store.selectedList) {
    list = store.selectedList;
    listName = list.name;
    if (list.songs[currentSong]) {
      songTitle = list.songs[currentSong].title;
      songArtist = list.songs[currentSong].artist;
    }
  }

  if (store.selectedList) {
    playlist = store.selectedList.songs.map((song) => song.youTubeId);
    console.log("HANO, " + JSON.stringify(store.selectedList));
  }

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = playlist[currentSong];
    player.loadVideoById(song);
    player.playVideo();
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
  }

  // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE PREVIOUS ONE
  function decSong() {
    currentSong--;
    currentSong = currentSong % playlist.length;
  }

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  function play(event) {
    event.target.playVideo();
  }

  function pause(event) {
    event.target.pauseVideo();
  }

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  return (
    <div id="video-player-container">
      <div id="video-player">
        <Youtube
          videoId={playlist[currentSong]}
          opts={{
            height: "350px",
            width: "100%",
            playerVars: {
              autoplay: 0,
            },
          }}
          onReady={(event) => {
            onPlayerReady(event);
            player = event;
          }}
          onStateChange={(event) => {
            onPlayerStateChange(event);
            player = event;
          }}
        />
      </div>

      <div id="now-playing">Now Playing</div>

      <div id="youtube-song-info">
        <span>Playlist: {listName} </span>
        <span>Song #: {store.selectedList ? currentSong + 1 : ""} </span>
        <span>Title: {songTitle} </span>
        <span>Artist: {songArtist} </span>
      </div>
      <div id="video-controls">
        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton
            style={{ color: "black" }}
            onClick={() => {
              if (currentSong !== 0) {
                decSong();
                onPlayerReady(player);
              }
            }}
          >
            <FastRewindIcon sx={{ fontSize: 50 }}></FastRewindIcon>
          </IconButton>

          <IconButton style={{ color: "black" }} onClick={() => pause(player)}>
            <StopIcon sx={{ fontSize: 50 }}></StopIcon>
          </IconButton>

          <IconButton style={{ color: "black" }} onClick={() => play(player)}>
            <PlayArrowIcon sx={{ fontSize: 50 }}></PlayArrowIcon>
          </IconButton>

          <IconButton
            style={{ color: "black" }}
            onClick={() => {
              incSong();
              onPlayerReady(player);
            }}
          >
            <FastForwardIcon sx={{ fontSize: 50 }}></FastForwardIcon>
          </IconButton>
        </Box>
      </div>
    </div>
  );
}
