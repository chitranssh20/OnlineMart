import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Header} from './Components/Header/Header'
import { Component } from 'react';
function App() {
 return (
  <>
  <Routes>
    <Route path = '/'  element = {Header} />

  </Routes>
  </>
 )
}

export default App;
