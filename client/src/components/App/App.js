import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import PostDetails from '../PostDetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="posts" />} />
          <Route path="posts">
            <Route index element={<Home />} />
            <Route path="search" element={<Home />} />
            <Route path=":id" element={<PostDetails />} />
          </Route>
          <Route path="auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
