import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import WorkspaceScreen from "./WorkspaceScreen";
import SongCard from "./SongCard.js";
import List from "@mui/material/List";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  // ! New state made for list card expansion
  const [expanded, setExpanded] = useState(false);

  const { idNamePair, selected } = props;

  function handleLoadList(event, id) {
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
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
    store.markListForDeletion(id);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
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
  // let cardElement = (
  //   <ListItem
  //     id={idNamePair._id}
  //     key={idNamePair._id}
  //     sx={{
  //       display: "flex",
  //       p: 1.5,
  //       border: 3,
  //       borderRadius: 2,
  //       mt: 1,
  //       backgroundColor: "beige",
  //     }}
  //     style={{ width: "100%", fontSize: "48pt" }}
  //     button
  //     // onClick={(event) => {
  //     //   handleLoadList(event, idNamePair._id);
  //     // }}
  //   >
  //     {/* // ! THE TOP CONTAINER, HOLDS THE TITLE, AUTHOUR, AND LIKE AND DISLIKE */}
  //     <Box sx={{ p: 1, flexGrow: 1 }}>
  //       <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
  //       <Box>By: </Box>
  //       <Box>
  //         <ThumbUpIcon></ThumbUpIcon>
  //         <ThumbDownAltIcon></ThumbDownAltIcon>
  //       </Box>
  //     </Box>

  //     {/* // ! THE BOTTOM CONTAINER, HOLDS THE PUBLISHED, LISTENS, AND EXPANSION BUTTON */}
  //     <Box sx={{ p: 1 }}>
  //       <IconButton onClick={handleToggleEdit} aria-label="edit">
  //         <EditIcon style={{ fontSize: "32pt" }} />
  //       </IconButton>
  //     </Box>
  //     <Box sx={{ p: 1 }}>
  //       <IconButton
  //         onClick={(event) => {
  //           handleDeleteList(event, idNamePair._id);
  //         }}
  //         aria-label="delete"
  //       >
  //         <DeleteIcon style={{ fontSize: "32pt" }} />
  //       </IconButton>
  //     </Box>
  //   </ListItem>
  // );

  let cardElement = "";

  // ! ##############################
  // ! WHEN THE LIST CARD IS COLLAPSED
  if (!expanded) {
    cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
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
        button
        // onClick={(event) => {
        //   handleLoadList(event, idNamePair._id);
        // }}
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
            <Box sx={{ flexGrow: 1, fontSize: 28 }}>{idNamePair.name}</Box>
            <Box>By: </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 40 }}></ThumbUpIcon>
            <ThumbDownAltIcon sx={{ fontSize: 40 }}></ThumbDownAltIcon>
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
          <Box>Published:</Box>
          <Box>Listens:</Box>
          <Box>
            <IconButton
              onClick={(event) => {
                setExpanded(true);
                handleLoadList(event, idNamePair._id);
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
  // ! ##############################
  // ! WHEN THE LIST CARD IS EXPANDED
  else {
    let songArray = "";
    if (store.currentList) {
      songArray = store.currentList.songs.map((song, index) => (
        <SongCard
          id={"playlist-song-" + index}
          key={"playlist-song-" + index}
          index={index}
          song={song}
        />
      ));
    }
    cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{
          display: "flex",
          p: 1.5,
          border: 3,
          borderRadius: 2,
          mt: 1,
          backgroundColor: "beige",
          flexDirection: "column",
        }}
        style={{ width: "100%", height: "45%" }}
        button
        // onClick={(event) => {
        //   handleLoadList(event, idNamePair._id);
        // }}
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
            <Box sx={{ flexGrow: 1, fontSize: 28 }}>{idNamePair.name}</Box>
            <Box>By: </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 40 }}></ThumbUpIcon>
            <ThumbDownAltIcon sx={{ fontSize: 40 }}></ThumbDownAltIcon>
          </Box>
        </Box>

        {/* // ! THE MIDDLE CONTAINER, HOLDS THE LISTS OF SONGS */}

        <Box style={{ width: "100%" }}>
          <List
            id="playlist-cards"
            sx={{
              width: "100%",
              background: "linear-gradient(to bottom, #084eb8, #1bbe96)",
            }}
          >
            {songArray}
          </List>
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
          <Box>Published:</Box>
          <Box>Listens:</Box>
          <Box>
            <IconButton
              onClick={() => setExpanded(false)}
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

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
