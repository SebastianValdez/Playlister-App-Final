import { Button } from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../auth";

export default function SplashScreen() {
  const { auth } = useContext(AuthContext);

  return (
    <div id="splash-screen">
      <div id="splash-screen-title">Playlister</div>

      <div id="splash-screen-welcome-text">
        Are you tired of YouTube and Spotify? Do you want to create, delete,
        edit, and view Playlists and more? Try Playlister! Register an account
        now or take a look around as a guest
      </div>

      <div id="splash-screen-buttons">
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          href="/login/"
        >
          Login
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          onClick={() => auth.loginGuest()}
        >
          Continue as Guest
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          href="/register/"
        >
          Register
        </Button>
      </div>

      <div id="splash-screen-user-credit-text">Created by Sebastian Valdez</div>
    </div>
  );
}
