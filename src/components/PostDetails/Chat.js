import React, { useEffect, useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import moment from "moment";

import useStyles from "./stylesPostDetails";

// import firebase sdk
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  //your config
  apiKey: "AIzaSyBqH7cM_ufrEWkVYZryJpf_cLP3PETm8Sg",
  authDomain: "memories-react-a8b97.firebaseapp.com",
  projectId: "memories-react-a8b97",
  storageBucket: "memories-react-a8b97.appspot.com",
  messagingSenderId: "600658257233",
  appId: "1:600658257233:web:d6615ef6a74e5f062f9f70",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Chat = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [messages, setMessages] = useState({});
  const [textMessage, setTextMessage] = useState("");
  const [message, setMessage] = useState({
    text: textMessage,
    author: user?.result?.name,
    createdAt: "",
    // authorImg: user.result.imageUrl,
  });
  const chatRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    const promise = getMessages();
    promise?.then(function (result) {
      setMessages(result);
    });
    updateChat();
  }, []);

  async function updateChat() {
    const q = query(collection(db, "test", String(post._id), "messages"));
    // const q = query(collection(db, `test/String(post._id)/messages`));
    return await onSnapshot(q, (snapshot) => {
      const promise = getMessages();
      promise?.then(function (result) {
        setMessages(result);
      });
      // console.log("updated");
      // snapshot.forEach((doc) => {
      //   if (Array.isArray(messages) && !messages.includes(doc.data()))
      //     setMessages([...messages, doc.data()]);
      // });
    });
  }
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [messages]);

  const handleClick = () => {
    message.text = textMessage;
    message.createdAt = new Date().toISOString();
    sendMessage(message);
    setTextMessage("");
  };

  async function getMessages() {
    const querySnapshot = await getDocs(
      collection(db, "test", String(post._id), "messages")
    );
    const messagesList = [];
    querySnapshot.forEach((doc) => {
      messagesList.push(doc.data());
    });
    return messagesList;
  }

  async function sendMessage(message) {
    return await addDoc(
      collection(db, "test", String(post._id), "messages"),
      message
    );
  }

  if (!user)
    return (
      <Typography gutterBottom variant="h6">
        Please login to chat
      </Typography>
    );

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <Typography gutterBottom variant="h6">
          Realtime Chat
        </Typography>
        <div className={classes.commentsInnerContainer}>
          {/* Display text here */}
          {Array.isArray(messages) &&
            messages.sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            }) &&
            messages?.map((m, i) => {
              if (i === messages.length - 1) {
                return (
                  <Typography key={i} gutterBottom variant="subtitle1">
                    <strong>{m.author}</strong>: {m.text}
                    <div ref={chatRef}></div>
                  </Typography>
                );
              } else {
                return (
                  <Typography key={i} gutterBottom variant="subtitle1">
                    <strong>{m.author}</strong>: {m.text}
                  </Typography>
                );
              }
            })}
        </div>
        {user?.result?.name && (
          <div style={{ width: "50%" }}>
            <Typography gutterBottom variant="h6">
              Send text
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Text"
              multiline
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!textMessage}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
