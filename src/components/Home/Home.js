import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

// To use redux, dispatch an action
import { useDispatch } from "react-redux";
// Import action to use dispatch on
import { getPosts } from "../../actions/posts";

import useStyles from "../../styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      {/* Grow provides simple animation */}
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
