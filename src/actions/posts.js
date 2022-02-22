import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
} from "../constants/actionTypes";

// Action creators
export const getPosts = () => async (dispatch) => {
  //dealing with async data
  try {
    // const response = ....
    const { data } = await api.fetchPosts(); //getting response, the response always have data object (data here represents posts)
    dispatch({ type: FETCH_ALL, payload: data }); //refactored to this one line
  } catch (error) {
    console.log(error);
  }
  // // action is an object with type and payload (data)
  // const action = {type: "FETCH_ALL", payload: []} //refactored
  // // return the action
  // dispatch(action); //refeactored
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
