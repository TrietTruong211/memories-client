import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// To handle images, change it to string
import FileBase from "react-file-base64";

// use api action
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

import useStyles from "./stylesForm";
import { useNavigate } from "react-router-dom";

// Get current id of posts

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // getting the user from local storage
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // NOTE
  // fetching post with a specific id
  const post = useSelector((state) =>
    currentId ? state?.posts?.posts?.find((p) => p._id === currentId) : null
  );

  //when post value changes, fill values in form with data from post
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent browser reload

    if (currentId === 0) {
      // dispatch(updatePost(currentId, postData));
      dispatch(createPost({ ...postData, name: user?.result?.name }), navigate);
    } else {
      // dispatch(createPost(postData));
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    // Div with white bg
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography vairant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        {/* creator: e.target.value this will only work with only 1 textfield, with 2 or more textfield, "creator" will be overrided since it's not specified in this object*/}
        {/* hence, adding ...postData (spreading post data), will only change the data of that specific textfield, cause postData is spreaded, data is persisted */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(",").map((tag) => {
                return tag.trim();
              }),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(
              { base64 } //remember {base64}
            ) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
