import "./App.css";
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./auth";
import { GlobalStoreContextProvider } from "./store";
import {
  AppBanner,
  ControlBanner,
  HomeWrapper,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  Statusbar,
  WorkspaceScreen,
  AllUserLists,
  OneUserLists,
} from "./components";
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <AppBanner />
          <ControlBanner />
          <Switch>
            <Route path="/" exact component={HomeWrapper} />
            <Route path="/login/" exact component={LoginScreen} />
            <Route path="/register/" exact component={RegisterScreen} />
            <Route path="/currentUserLists" exact component={HomeScreen} />
            <Route path="/allLists" exact component={AllUserLists} />
            <Route path="/userLists" exact component={OneUserLists} />
            <Route path="/playlist/:id" exact component={WorkspaceScreen} />
          </Switch>
          <Statusbar />
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
