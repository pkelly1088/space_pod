import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import LikedPhoto from './components/LikedPhoto';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/LikedPhoto' element={<LikedPhoto />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
