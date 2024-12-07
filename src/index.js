import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import AddContact from './pages/AddContact';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/contact/add" element={<AddContact/>} />
      <Route path="/contact/edit/:ContactID" element={<AddContact/>} />
    </Routes>
  </BrowserRouter>
);
