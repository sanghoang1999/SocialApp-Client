import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  GET_NOTIFICATIONS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_PROFILE,
  MARK_READ_NOTIFICATIONS,
  GET_SCREAMS,
  CLEAR_SCREAMS,
  GET_PROFILE
} from "./type";
import { setAlert } from "./alert";
import React from "react";
import { loadUser } from "./auth";
import { setMessage } from "./message";
import firebase from "../fb";
export const uploadImage = formData => async dispatch => {
  try {
    await axios.post("/user/image", formData);
    dispatch(loadUser());
    dispatch(setMessage("Update image successfully", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = formData => async dispatch => {
  try {
    await axios.post("/user/detail", formData);
    dispatch(loadUser());
    dispatch(setMessage("Update User' details successfully", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = handle => async dispatch => {
  try {
    dispatch({
      type: CLEAR_SCREAMS
    });
    dispatch({
      type: CLEAR_PROFILE
    });
    const res = await axios.get(`/user/${handle}`);
    console.log(res.data);
    dispatch({
      type: GET_SCREAMS,
      payload: res.data
    });
    dispatch({
      type: GET_PROFILE,
      payload: res.data.user
    });
  } catch (error) {
    console.log(error);
  }
};
export const markReadNotis = notifications => async dispatch => {
  try {
    const res = await axios.post(`/user/notifications`, notifications);
    console.log(res.data);
    dispatch({
      type: MARK_READ_NOTIFICATIONS
    });
  } catch (error) {
    console.log(error);
  }
};

export const realTimeNotifications = userHandle => async dispatch => {
  var first = true;
  const ref = firebase
    .database()
    .ref("notifications")
    .limitToFirst(1);
  ref.on("child_added", snap => {
    console.log(snap.val());
  });
};
