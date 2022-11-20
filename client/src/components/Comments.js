import { useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";

import TextField from "@mui/material/TextField";

export default function Comments() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [text, setText] = useState("");

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      store.addNewComment(auth.user.username, text);
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  return (
    <div id="comments-container">
      <div id="comments-list"></div>
      <div id="new-comments-container">
        <TextField
          id="filled-basic"
          label="Add Comment"
          variant="filled"
          style={{ backgroundColor: "white" }}
          sx={{ width: "100%" }}
          onKeyPress={handleKeyPress}
          onChange={handleUpdateText}
        />
      </div>
    </div>
  );
}
