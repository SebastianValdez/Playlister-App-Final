import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";

import Box from "@mui/material/Box";

export default function CommentCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { comment } = props;

  return (
    <Box
      key={"comment by-" + comment.author}
      style={{ backgroundColor: "teal" }}
      sx={{
        width: "95%",
        ml: "6px",
        mt: "4px",
        border: "solid",
        borderRadius: "5px",
      }}
    >
      <Box style={{ fontSize: "17px", fontWeight: "bold" }}>
        {comment.author}
      </Box>
      <Box style={{ fontSize: "22px" }}>{comment.comment}</Box>
    </Box>
  );
}
