import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import WorkspaceScreen from "./WorkspaceScreen";
import SongCard from "./SongCard.js";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { borderRadius } from "@mui/system";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  // ! New state made for list card expansion
  const [expanded, setExpanded] = useState(false);

  const { list, selected } = props;

  // ! Use this method to set current list, this will control what is displayed in the video and comments tab
  function handleLoadList(event, id) {
    event.stopPropagation();
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
      console.log("HANO ", store.currentList);
    }
  }

  function handleClickList(event, id) {
    event.stopPropagation();
    store.setClickedList(id);
  }

  // ! Use this method to get the songs of a list, we will display these in the list card
  function handleLoadSongs() {
    let playlist = store.playlistsArray.filter(
      (lists) => lists._id === list.id
    );
    return playlist.songs;
  }

  // ! Like and dislike

  function handleLike(event) {
    event.stopPropagation();
    store.likeOrDislikeList(list._id, "like", auth.user.username);
  }

  function handleDislike(event) {
    event.stopPropagation();
    store.likeOrDislikeList(list._id, "dislike", auth.user.username);
  }

  // ! Functions for handling all the button inputs in list card
  function handleAddNewSong(event) {
    event.stopPropagation();
    store.addNewSong();
  }

  function handleUndo(event) {
    event.stopPropagation();
    store.undo();
  }

  function handleRedo(event) {
    event.stopPropagation();
    store.redo();
  }

  function handleClose(event) {
    event.stopPropagation();
    store.closeCurrentList();
  }

  function handleDelete(event) {
    event.stopPropagation();
  }

  function handlePublish(event) {
    event.stopPropagation();
    store.publishList();
  }

  function handleDuplicate(event) {
    event.stopPropagation();
    store.duplicatePlaylist();
  }

  // ! Edit playlist name functions
  function handleToggleEdit(event) {
    event.stopPropagation();
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    let _id = event.target.id;
    _id = ("" + _id).substring("delete-list-".length);
    store.markListForDeletion(list._id);
  }

  function handleKeyPress(event) {
    event.stopPropagation();
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    event.stopPropagation();
    setText(event.target.value);
  }

  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }

  let likeAndDislikeSection = "";

  let cardElement = "";

  // ! ##############################
  // ! WHEN THE LIST CARD IS COLLAPSED
  if (!expanded) {
    cardElement = (
      <ListItem
        id={list._id}
        key={list._id}
        sx={{
          display: "flex",
          p: 1.5,
          border: 3,
          borderRadius: 2,
          mt: 1,
          backgroundColor: "beige",
          flexDirection: "column",
        }}
        style={{ width: "100%" }}
        onClick={(event) => {
          handleClickList(event, list._id);
        }}
      >
        {/* // ! THE TOP CONTAINER, HOLDS THE TITLE, AUTHOUR, AND LIKE AND DISLIKE */}
        <Box
          sx={{
            p: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            fontWeight: "bold",
          }}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            style={{ width: "100%" }}
          >
            <Box sx={{ flexGrow: 1, fontSize: 28 }}>{list.name}</Box>
            <Box>By: {list.ownerUsername} </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {auth.user !== "guest" ? (
              <>
                {list.published.isPublished ? (
                  <>
                    <IconButton
                      sx={{ fontSize: 40 }}
                      style={{ color: "black" }}
                      onClick={(event) => handleLike(event)}
                    >
                      <ThumbUpIcon sx={{ fontSize: 40 }}></ThumbUpIcon>
                      {list.likes.length}
                    </IconButton>
                    <IconButton
                      sx={{ fontSize: 40 }}
                      style={{ color: "black" }}
                      onClick={(event) => handleDislike(event)}
                    >
                      <ThumbDownAltIcon
                        sx={{ fontSize: 40 }}
                      ></ThumbDownAltIcon>
                      {list.dislikes.length}
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>

        {/* // ! THE BOTTOM CONTAINER, HOLDS THE PUBLISHED, LISTENS, AND EXPANSION BUTTON */}
        <Box
          sx={{
            p: 1,
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontWeight: "bold",
          }}
          style={{ width: "100%" }}
        >
          {list.published.isPublished ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                Published:{" "}
                <Box style={{ color: "green" }} sx={{ pl: "5px" }}>
                  {new Date(list.published.publishedDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </Box>{" "}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row" }}>
                Listens:{" "}
                <Box style={{ color: "red" }} sx={{ pl: "5px" }}>
                  {list.listens}
                </Box>{" "}
              </Box>
            </>
          ) : (
            <>
              <Box></Box>
              <Box></Box>
            </>
          )}
          <Box>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setExpanded(true);
                handleLoadList(event, list._id);
              }}
              sx={{ top: "10px" }}
              style={{ color: "black" }}
            >
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Box>
      </ListItem>
    );
  }
  // ! ##########################################################################################
  // ! ##########################################################################################
  // ! ##########################################################################################
  // ! WHEN THE LIST CARD IS EXPANDED
  else {
    let songArray = "";
    let listBackground = "";
    if (store.currentList) {
      songArray = store.currentList.songs.map((song, index) => (
        <SongCard
          id={"playlist-song-" + index}
          key={"playlist-song-" + index}
          index={index}
          song={song}
          published={store.currentList.published.isPublished}
        />
      ));

      if (!store.currentList.published.isPublished) {
        listBackground = "lightgrey";
      } else listBackground = "#2c2f70";
    }

    cardElement = (
      <ListItem
        id={list._id}
        key={list._id}
        sx={{
          display: "flex",
          p: 1.5,
          border: 3,
          borderRadius: 2,
          mt: 1,
          backgroundColor: "beige",
          flexDirection: "column",
        }}
        style={{ width: "100%", height: "650px" }}
      >
        {/* // ! THE TOP CONTAINER, HOLDS THE TITLE, AUTHOUR, AND LIKE AND DISLIKE */}
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "row",
            fontWeight: "bold",
          }}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            style={{ width: "100%" }}
          >
            <Box sx={{ flexGrow: 1, fontSize: 28 }}>{list.name}</Box>
            <Box>By: {list.ownerUsername} </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {auth.user !== "guest" ? (
              <>
                {list.published.isPublished ? (
                  <>
                    <IconButton
                      sx={{ fontSize: 40 }}
                      style={{ color: "black" }}
                      onClick={(event) => handleLike(event)}
                    >
                      <ThumbUpIcon sx={{ fontSize: 40 }}></ThumbUpIcon>
                      {list.likes.length}
                    </IconButton>
                    <IconButton
                      sx={{ fontSize: 40 }}
                      style={{ color: "black" }}
                      onClick={(event) => handleDislike(event)}
                    >
                      <ThumbDownAltIcon
                        sx={{ fontSize: 40 }}
                      ></ThumbDownAltIcon>
                      {list.dislikes.length}
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>

        {/* // ! THE MIDDLE CONTAINER, HOLDS THE LISTS OF SONGS */}

        <Box style={{ width: "100%", maxHeight: "67%" }} sx={{ flexGrow: 1 }}>
          <List
            id="playlist-cards"
            sx={{
              width: "100%",
              minHeight: "90%",
              maxHeight: "90%",
              overflow: "auto",
              background: listBackground,
              border: "solid",
              borderRadius: "10px",
            }}
          >
            {songArray}
          </List>
        </Box>

        {/* // ! THE SECOND MIDDLE CONTAINER, HOLDS THE BUTTONS TO MANIPULATE */}

        <Box
          sx={{
            m: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {auth.user !== "guest" ? (
            <>
              {!list.published.isPublished ? (
                <>
                  <Box>
                    <Button
                      variant="contained"
                      sx={{ mr: 2 }}
                      style={{
                        backgroundColor: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      onClick={(event) => handleAddNewSong(event)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mr: 2 }}
                      style={{
                        backgroundColor: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      onClick={(event) => handleUndo(event)}
                    >
                      Undo
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      onClick={(event) => handleRedo(event)}
                    >
                      Redo
                    </Button>
                  </Box>
                </>
              ) : (
                <Box></Box>
              )}

              <Box>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  style={{
                    backgroundColor: "lightgrey",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={(event) => handleDeleteList(event)}
                >
                  Delete
                </Button>

                {!list.published.isPublished ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{ mr: 2 }}
                      style={{
                        backgroundColor: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      onClick={(event) => handlePublish(event)}
                    >
                      Publish
                    </Button>
                  </>
                ) : (
                  ""
                )}

                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "lightgrey",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={(event) => {
                    handleDuplicate(event);
                  }}
                >
                  Duplicate
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box></Box>
            </>
          )}
        </Box>

        {/* // ! THE BOTTOM CONTAINER, HOLDS THE PUBLISHED, LISTENS, AND EXPANSION BUTTON */}
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontWeight: "bold",
          }}
          style={{ width: "100%" }}
        >
          {list.published.isPublished ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                Published:{" "}
                <Box style={{ color: "green" }} sx={{ pl: "5px" }}>
                  {new Date(list.published.publishedDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </Box>{" "}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row" }}>
                Listens:{" "}
                <Box style={{ color: "red" }} sx={{ pl: "5px" }}>
                  {list.listens}
                </Box>{" "}
              </Box>
            </>
          ) : (
            <>
              <Box></Box>
              <Box></Box>
            </>
          )}
          <Box>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setExpanded(false);
                store.closeCurrentList();
              }}
              sx={{ top: "10px" }}
              style={{ color: "black" }}
            >
              <KeyboardDoubleArrowUpIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Box>
      </ListItem>
    );
  }

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + list._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={list.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
