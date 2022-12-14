import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  HIDE_MODALS: "HIDE_MODALS",
  UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
  LOAD_ALL_PLAYLISTS: "LOAD_ALL_PLAYLISTS",
  ADD_NEW_COMMENT: "ADD_NEW_COMMENT",
  PUBLISH_PLAYLIST: "PUBLISH_PLAYLIST",
  LIKE_OR_DISLIKE_PLAYLIST: "LIKE_OR_DISLIKE_PLAYLIST",
  DUPLICATE_PLAYLIST: "DUPLICATE_PLAYLIST",
  SET_SORT_TYPE: "SET_SORT_TYPE",
  SET_SEARCH_FILTER: "SET_SEARCH_FILTER",
  SET_SELECTED_LIST: "SET_SELECTED_LIST",
  SET_PLAYER: "SET_PLAUER",
  SET_SONG_INDEX: "SET_SONG_INDEX",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
  NONE: "NONE",
  DELETE_LIST: "DELETE_LIST",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  DUPLICATE_NAME: "DUPLICATE_NAME",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    idNamePairs: [],
    playlistsArray: [],
    currentList: null,
    selectedList: null, // ! Like currentList, but this is the list where you show comments and play video
    currentSongIndex: -1,
    currentSong: null,
    newListCounter: 0,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
    sortType: null,
    searchFilter: "",
    player: null,
    songIndex: 0,
  });
  const history = useHistory();

  console.log("inside useGlobalStore");

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload.playlistList,
          currentList: store.currentList,
          selectedList: payload.playlist,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: null,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: payload,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: payload,
          playlistsArray: store.playlistsArray,
          currentList: null,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_LIST,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: payload,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      //
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentModal: CurrentModal.EDIT_SONG,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          currentModal: CurrentModal.REMOVE_SONG,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.DUPLICATE_NAME: {
        return setStore({
          currentModal: CurrentModal.DUPLICATE_NAME,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: store.currentSongIndex,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.LOAD_ALL_PLAYLISTS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.ADD_NEW_COMMENT: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.PUBLISH_PLAYLIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload,
          currentList: null,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.LIKE_OR_DISLIKE_PLAYLIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.DUPLICATE_PLAYLIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.SET_SORT_TYPE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: payload,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.SET_SEARCH_FILTER: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: payload,
          player: store.player,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.SET_SELECTED_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: payload.newLists,
          currentList: store.currentList,
          selectedList: payload.newList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: 0,
        });
      }
      case GlobalStoreActionType.SET_PLAYER: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: payload,
          songIndex: store.songIndex,
        });
      }
      case GlobalStoreActionType.SET_SONG_INDEX: {
        return setStore({
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          playlistsArray: store.playlistsArray,
          currentList: store.currentList,
          selectedList: store.selectedList,
          currentSongIndex: -1,
          currentSong: store.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          sortType: store.sortType,
          searchFilter: store.searchFilter,
          player: store.player,
          songIndex: payload,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = function (id, newName) {
    let boolean = true;
    for (let i = 0; i < store.playlistsArray.length; i++) {
      if (store.playlistsArray[i].name == newName) {
        store.showDuplicateNameModal();
        boolean = false;
      }
    }

    if (boolean) {
      // GET THE LIST
      async function asyncChangeListName(id) {
        let response = await api.getPlaylistById(id);
        if (response.data.success) {
          let playlist = response.data.playlist;
          playlist.name = newName;
          async function updateList(playlist) {
            response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
              async function getAllLists(playlist) {
                response = await api.getAllPlaylists();
                if (response.data.success) {
                  let listArray = response.data.playlists;
                  storeReducer({
                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                    payload: {
                      playlistList: listArray,
                      playlist: playlist,
                    },
                  });
                }
              }
              getAllLists(playlist);
            }
          }
          updateList(playlist);
        }
      }
      if (newName) asyncChangeListName(id); // ! Fixes bug where the edit list errors if no changes made to name
    }
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
    tps.clearAllTransactions();
    // history.push("/"); // ! Fixes the issue where closing the list would just leave you in a blank page for some reason
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = async function () {
    let userResponse = await auth.getUser();
    let newListName = "Untitled " + userResponse.playlists.length;
    const response = await api.createPlaylist(
      newListName,
      [],
      auth.user.email,
      auth.user.username,
      [],
      [],
      0,
      [],
      false
    );
    console.log("createNewList response: " + response);
    if (response.status === 201) {
      tps.clearAllTransactions();
      let newList = response.data.playlist;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: null,
      });

      // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      // history.push("/currentUserLists");
      store.getAllPlaylists();
    } else {
      console.log("API FAILED TO CREATE A NEW LIST");
    }
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      const response = await api.getPlaylistPairs();
      if (response.data.success) {
        tps.clearAllTransactions();
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };

  // ! Fixing the delete list, this method didn exist before for some reason
  store.unmarkListForDeletion = function () {
    storeReducer({
      type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
      payload: {},
    });
  };

  store.deleteList = function (id) {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      if (response.data.success) {
        store.getAllPlaylists();
      }
    }
    processDelete(id);
    store.getAllPlaylists();
  };

  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };
  // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
  // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

  store.showEditSongModal = (songIndex, songToEdit) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToEdit },
    });
  };

  store.showRemoveSongModal = (songIndex, songToRemove) => {
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToRemove },
    });
  };

  store.showDuplicateNameModal = () => {
    storeReducer({
      type: GlobalStoreActionType.DUPLICATE_NAME,
      payload: null,
    });
  };

  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };

  store.isDuplicateNameModalOpen = () => {
    return store.currentModal === CurrentModal.DUPLICATE_NAME;
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;

        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist,
          });
          // history.push("/playlist/" + playlist._id);
        }
      }
    }
    asyncSetCurrentList(id);
  };

  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };
  store.addNewSong = function () {
    let index = this.getPlaylistSize();
    this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
  };
  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = function (index, song) {
    let list = store.currentList;
    list.songs.splice(index, 0, song);
    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = function (start, end) {
    let list = store.currentList;

    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };

  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = function (index) {
    let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };

  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = function (index, songData) {
    let list = store.currentList;
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };

  store.addNewSong = () => {
    let playlistSize = store.getPlaylistSize();
    store.addCreateSongTransaction(
      playlistSize,
      "Untitled",
      "?",
      "dQw4w9WgXcQ"
    );
  };

  // ! Adds a new comment to the current list
  store.addNewComment = (user, comment) => {
    async function asyncAddComment(user, comment) {
      let newComment = { author: user, comment: comment };
      let list = store.selectedList;
      list.comments.push(newComment);

      const response = await api.addNewComment(store.selectedList._id, list);
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.ADD_NEW_COMMENT,
          payload: null,
        });
      } else {
        console.log("FAILED TO ADD A NEW COMMENT");
      }
    }

    asyncAddComment(user, comment);
  };

  // ! Publishes the current list
  store.publishList = () => {
    async function asyncPublishPlaylist() {
      const response = await api.publishPlaylist(store.currentList._id);
      if (response.data.success) {
        let listArray = await store.getAllPlaylists();
        storeReducer({
          type: GlobalStoreActionType.PUBLISH_PLAYLIST,
          payload: listArray,
        });
      } else {
        console.log("FAILED TO PUBLISH PLAYLIST");
      }
    }
    asyncPublishPlaylist();
  };

  // ! Likes or Dislikes a list
  store.likeOrDislikeList = (listId, likeOrDislike, user) => {
    async function asyncLikeOrDislike(listId, likeOrDislike, user) {
      const response = await api.likeOrDislikePlaylist(
        listId,
        likeOrDislike,
        user
      );
      if (response.data.success) {
        let listArray = await store.getAllPlaylists();
        storeReducer({
          type: GlobalStoreActionType.LIKE_OR_DISLIKE_PLAYLIST,
          payload: listArray,
        });
      } else {
        console.log("FAILED TO LIKE/DISLIKE PLAYLIST");
      }
    }
    asyncLikeOrDislike(listId, likeOrDislike, user);
    let list = store.currentList;
  };

  // ! Duplicates a playlist
  store.duplicatePlaylist = () => {
    async function asyncDuplicatePlaylist() {
      let newListName = "Copy of " + store.currentList.name;
      const response = await api.createPlaylist(
        newListName,
        store.currentList.songs,
        auth.user.email,
        auth.user.username,
        [],
        [],
        0,
        [],
        false
      );
      if (response.data.success) {
        let listArray = await store.getAllPlaylists();
        storeReducer({
          type: GlobalStoreActionType.DUPLICATE_PLAYLIST,
          payload: listArray,
        });
      } else {
        console.log("FAILED TO DUPLICATE PLAYLIST");
      }
    }
    asyncDuplicatePlaylist();
  };

  // ! Gets every playlist, not in some dumb pair format
  store.getAllPlaylists = () => {
    async function asyncAllLists() {
      try {
        const response = await api.getAllPlaylists();
        if (response.data.success) {
          tps.clearAllTransactions();
          let listsArray = response.data.playlists;
          console.log("hello " + response.data.playlists);
          storeReducer({
            type: GlobalStoreActionType.LOAD_ALL_PLAYLISTS,
            payload: listsArray,
          });
          return listsArray;
        } else {
          console.log("API FAILED TO GET ALL THE LISTS");
        }
      } catch (e) {
        console.log("Error getting the playlists");
      }
    }
    return asyncAllLists();
  };

  store.setCurrentListNoAuth = function (list) {
    async function asyncUpdateCurrentList(list) {
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_LIST,
        payload: list,
      });
    }
    asyncUpdateCurrentList(list);
  };

  store.listenList = function (id) {
    async function asyncListenList(id) {
      const addListen = await api.listenToList(id);
      if (addListen.data.success) {
        let listArray = await store.getAllPlaylists();
        storeReducer({
          type: GlobalStoreActionType.LIKE_OR_DISLIKE_PLAYLIST,
          payload: listArray,
        });
      }
    }
    asyncListenList(id);
  };

  // ! Sets the clicked list, this is the list that we show video and comments for
  store.setClickedList = function (id) {
    async function asyncSetClickedList(id) {
      const addListen = await api.listenToList(id);
      if (addListen.data.success) {
        const allLists = await api.getAllPlaylists();
        if (allLists.data.success) {
          const list = allLists.data.playlists.filter(
            (list) => list._id === id
          )[0];
          storeReducer({
            type: GlobalStoreActionType.SET_SELECTED_LIST,
            payload: { newList: list, newLists: allLists.data.playlists },
          });
        }
      }
      tps.clearAllTransactions();
    }
    asyncSetClickedList(id);
  };

  store.removeClickedList = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_SELECTED_LIST,
      payload: {
        newList: null,
        newLists: store.playlistsArray,
      },
    });
    tps.clearAllTransactions();
  };

  // ! Change how we sort the lists
  store.setSortType = function (type) {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_TYPE,
      payload: type,
    });
  };

  // ! Sort the lists
  store.sortLists = function (list) {
    if (store.sortType == "name") {
      list.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (store.sortType == "creation date") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (store.sortType == "update date") {
      list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    // ! Use the published list for the fields that only relate to the published versions

    // let publishedList = list.filter((list) => list.published.isPublished);
    if (store.sortType == "publish date") {
      list.sort(
        (a, b) =>
          new Date(b.published.publishedDate) -
          new Date(a.published.publishedDate)
      );
    } else if (store.sortType == "listens") {
      list.sort((a, b) => b.listens - a.listens);
    } else if (store.sortType == "likes") {
      list.sort((a, b) => b.likes.length - a.likes.length);
    } else if (store.sortType == "dislikes") {
      list.sort((a, b) => b.dislikes.length - a.dislikes.length);
    }

    return list;
  };

  // ! Change what to look for in the lists
  store.setSearchFilter = function (filter) {
    storeReducer({
      type: GlobalStoreActionType.SET_SEARCH_FILTER,
      payload: filter,
    });
  };

  store.searchWithFilter = function (location, playlistList) {
    // ! Search via list titles
    if (store.searchFilter !== "" && location == "/allLists") {
      playlistList = playlistList.filter((list) =>
        list.name.toLowerCase().includes(store.searchFilter.toLowerCase())
      );
    }
    // ! Search via list owners
    else if (store.searchFilter !== "" && location == "/userLists") {
      playlistList = playlistList.filter((list) =>
        list.ownerUsername
          .toLowerCase()
          .includes(store.searchFilter.toLowerCase())
      );
    }
    return playlistList;
  };

  store.setPlayer = function (player) {
    storeReducer({
      type: GlobalStoreActionType.SET_PLAYER,
      payload: player,
    });
  };

  store.setSongIndex = function (index) {
    storeReducer({
      type: GlobalStoreActionType.SET_SONG_INDEX,
      payload: index,
    });
  };

  // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addUpdateSongTransaction = function (index, newSongData) {
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData
    );
    tps.addTransaction(transaction);
  };
  store.updateCurrentList = function () {
    async function asyncUpdateCurrentList() {
      const response = await api.updatePlaylistById(
        store.currentList._id,
        store.currentList
      );
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: store.currentList,
        });
      }
    }
    asyncUpdateCurrentList();
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };
  store.canAddNewSong = function () {
    return store.currentList !== null;
  };
  store.canUndo = function () {
    return store.currentList !== null && tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.currentList !== null && tps.hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
