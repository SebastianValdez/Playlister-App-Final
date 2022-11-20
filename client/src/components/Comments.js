import TextField from "@mui/material/TextField";

export default function Comments() {
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
        />
      </div>
    </div>
  );
}
