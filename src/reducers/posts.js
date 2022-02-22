import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
} from "../constants/actionTypes";

// const reducer = (state, action) => {
//  return state changed by the action
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  //state always have to be equal to something, hence = []
  // returning state changed by the action
  switch (action.type) {
    // these were handled in actions/posts
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload]; //spread all posts, and add a new post (that is in payload)
    case UPDATE:
    case LIKE: //2 cases next to each other means they will do the same thing
      return posts.map(
        (post) => (post._id === action.payload._id ? action.payload : post) //action.payload is the updated post
      ); //use map to loop through all posts, if it's the same id then replace with updated post, then return the newly updated array
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
