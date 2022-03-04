import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
// import Chat from "./components/Chat/Chat";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Home />} />
          {/* <Route path="/chat" exact element={<Chat />} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
