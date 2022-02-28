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

// const reducer = (state, action) => {
//  return state changed by the action
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
  //changing the structure of state
  //state always have to be equal to something, hence = []
  // returning state changed by the action
  switch (action.type) {
    // these were handled in actions/posts
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }; //spread all posts, and add a new post (that is in payload)
    case UPDATE:
    case LIKE: //2 cases next to each other means they will do the same thing
      return {
        ...state,
        posts: state.posts.map(
          (post) => (post._id === action.payload._id ? action.payload : post) //action.payload is the updated post
        ),
      }; //use map to loop through all posts, if it's the same id then replace with updated post, then return the newly updated array
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }), //return all posts normally, and change only the one just received a comment
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
