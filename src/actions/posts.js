import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";

// Action creators
export const getPosts = (page) => async (dispatch) => {
  //dealing with async data
  try {
    dispatch({ type: START_LOADING });

    // const response = ....
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page); //getting response, the response always have data object (data here represents posts)

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    }); //refactored to this one line

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
  // // action is an object with type and payload (data)
  // const action = {type: "FETCH_ALL", payload: []} //refactored
  // // return the action
  // dispatch(action); //refeactored
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id); //getting response, the response always have data object (data here represents posts)

    dispatch({
      type: FETCH_POST,
      payload: data,
    }); //refactored to this one line

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    navigate(`/posts/${data._id}`);
    dispatch({ type: END_LOADING });
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

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(comment, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
