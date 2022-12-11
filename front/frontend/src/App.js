import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import {Header} from './Components/Header/Header'
import { Component } from 'react';
function App() {
 return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path = '/'  element = { <Header /> } />

  </Routes>
  </BrowserRouter>
  </>
 )
}

export default App;
