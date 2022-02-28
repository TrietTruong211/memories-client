import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./stylesPostDetails";
import { getPost, getPostsBySearch } from "../../actions/posts";
import Carousel from "react-material-ui-carousel";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const maxChunkRecommendedPost = 3;
  const maxCharRecommendedPost = 200;

  // Get a single post
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  // Get the recommended post by search using tags of current post
  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  const recommendedPosts = post && posts.filter(({ _id }) => _id !== post._id); //excluding the current post from the list of posts to get the recommended post
  const recommendedPostsCarousel = [];
  var i, j, temp;
  for (
    i = 0, j = recommendedPosts.length;
    i < j;
    i += maxChunkRecommendedPost
  ) {
    temp = recommendedPosts.slice(i, i + maxChunkRecommendedPost);
    recommendedPostsCarousel.push(temp);
  }
  console.log(recommendedPostsCarousel);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  console.log(post);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </div>
      </div>
      {/* RECOMMENDED POST */}
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            {" "}
            You might also like:{" "}
          </Typography>
          <Divider />
          <Carousel
            autoPlay={false}
            fullHeightHover={true}
            indicatorContainerProps={{
              style: {
                marginTop: "50px",
              },
            }}
          >
            {recommendedPostsCarousel?.map((smallerChunk) => (
              <div style={{ display: "flex", margin: "0px 50px" }}>
                {smallerChunk?.map(
                  ({ title, message, name, likes, selectedFile, _id }) => (
                    <div
                      style={{ margin: "20px", cursor: "pointer" }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {message.length > maxCharRecommendedPost
                          ? message.slice(0, maxCharRecommendedPost) + ` ...`
                          : message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes: {likes.length}
                      </Typography>
                      <img
                        src={selectedFile}
                        width="100%"
                        alt={title}
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                  )
                )}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
