import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

// To use redux, dispatch an action
import { useDispatch } from "react-redux";
// Import action to use dispatch on
import { getPosts, getPostsBySearch } from "../../actions/posts";

import Paginate from "../Pagination";
import useStyles from "./stylesHome";

// function to be used as hook to get url params
// to know which page is we're on and search terms that we're looking for
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();

  const query = useQuery(); //use hook, to get page info
  const navigate = useNavigate();
  const page = query.get("page") || 1; //read url and see if page param is in there, else 1st page
  const searchQuery = query.get("search"); //read url and look for search param (search terms)

  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);

  //Search function return only the filterd posts
  const searchPost = () => {
    if (searchTerm.trim() || tags) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(",") })); //passing searchterm and tags as params, tags has to be turn into a string, separated by comma
      navigate(
        `/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  };
  // Run search function when user press ENTER
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //if press enter
      searchPost();
    }
  };
  // Add a tag to list of tags
  const handleAdd = (tag) => setTags([...tags, tag]);
  // Delete a tag from list of tags
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      {/* Grow provides simple animation */}
      <Container maxWidth="xl">
        <Grid
          // className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
