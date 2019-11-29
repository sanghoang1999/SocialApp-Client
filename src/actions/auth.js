import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT
} from "./type";
import { setAlert } from "./alert";

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/user");
    console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    const data = {
      email,
      password
    };
    const token = await axios.post("/user/login", data);
    console.log(token.data);
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token.data
    });
    dispatch(loadUser());
    return token;
  } catch (error) {
    const errObject = error.response.data.errors.reduce((x, y) => {
      console.log(Object.keys(y).length);
      const data = {};
      if (Object.keys(y).length > 1) {
        x[y.param] = y.msg;
      } else {
        console.log(y.msg, y.msg.indexOf("Passwrod"));
        if (y.msg.indexOf("Password") !== -1) {
          x["password"] = y.msg;
        } else {
          x["email"] = y.msg;
        }
      }
      return x;
    }, {});
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch(setAlert(errObject, "danger", 0));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const register = ({ email, password, handle }) => async dispatch => {
  try {
    const data = {
      email,
      password,
      handle
    };
    const token = await axios.post("/user/signup", data);
    console.log(token.data);
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: token.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errObject = error.response.data.errors.reduce((x, y) => {
      console.log(Object.keys(y).length);
      if (Object.keys(y).length > 1) {
        x[y.param] = y.msg;
      } else {
        console.log(y.msg, y.msg.indexOf("Passwrod"));
        if (y.msg.indexOf("Password") !== -1) {
          x["password"] = y.msg;
        } else if (y.msg.indexOf("Email") !== -1) {
          x["email"] = y.msg;
        } else {
          x["handle"] = y.msg;
        }
      }
      return x;
    }, {});
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch(setAlert(errObject, "danger", 0));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
