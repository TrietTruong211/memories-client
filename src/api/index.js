import axios from "axios";

const API = axios.create({ baseUrl: "http://localhost:5000" });

// Intercepting all request and adding authentication
API.interceptors.request.use((req) => {
  // Getting authentication value from profile in local storage
  if (localStorage.getItem("profile")) {
    // populating request header authorization to be used by server side
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`; //have to start with Bearer, then token
  }
  return req; // return req to make future requests
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
