import React from "react";
import Post from "./Post/Post";
import useStyles from "./stylesPosts";

// use selector to access the store (global state)
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  // Use selector to get data
  // "posts" comes from the reducers
  // const posts = useSelector((state) => state.posts); //used to have array of posts, now have an object with posts in it
  const { posts, isLoading } = useSelector((state) => state.posts); //destructuring because state has been refactored
  console.log("Component posts");
  console.log(posts);

  if (!posts?.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post.id} item xs={12} md={6} sm={12} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
