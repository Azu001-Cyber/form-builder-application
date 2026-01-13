// import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Login from './Authentication/Login/login'
// import Register from './Authentication/Registration/register'
// import FormBuilder from './App/main_app'
// import LandingPage from './Landing/Landingpage'

import Login from './components/login'
import Register from './components/register'
import FormBuilder from './components/main_app'
import LandingPage from './components/Landingpage'

function App() {

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        {/* Main Application Routes */}
        <Route path='/formly' element={<FormBuilder/>}/>

        <Route path='/' element={<LandingPage/>}/>       
      </Routes>
    </Router>
  );
};

export default App;
