import { useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";

import CommentCard from "./CommentCard";

import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { List } from "@mui/material";

export default function Comments() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [text, setText] = useState("");

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      store.addNewComment(auth.user.username, text);
      setText("");
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let commentsArray = "";

  if (store.selectedList) {
    commentsArray = store.selectedList.comments.map((comment) => (
      <CommentCard key={"comment by-" + comment.author} comment={comment} />
    ));
  }

  return (
    <div id="comments-container">
      <div id="comments-list">
        <Box style={{ width: "100%", height: "100%" }} sx={{ flexGrow: 1 }}>
          <List
            id="playlist-cards"
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              overflow: "auto",
              background: "lightgrey",
              border: "solid",
            }}
          >
            {commentsArray}
          </List>
        </Box>
      </div>
      <div id="new-comments-container">
        {store.selectedList && auth.user !== "guest" ? (
          <TextField
            id="filled-basic"
            label="Add Comment"
            variant="filled"
            defaultValue={text}
            value={text}
            style={{ backgroundColor: "white" }}
            sx={{ width: "100%" }}
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              textAlign: "center",
              fontSize: "32px",
            }}
            style={{ backgroundColor: "grey" }}
          >
            No List Selected
          </Box>
        )}
      </div>
    </div>
  );
}
