// import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Login from './Authentication/Login/login'
// import Register from './Authentication/Registration/register'
// import FormBuilder from './App/main_app'
// import LandingPage from './Landing/Landingpage'

import Login from './components/login'
import Register from './components/register'
import FormList from './components/FormList'
import LandingPage from './components/Landingpage'
import ProtectedRoute from './components/ProtectedRoute'
import FormBuilder from "./components/FormBuilder";

import FormDetail from './components/FormDetail'
// import CreateForm from "./components/CreateForm";

function App() {

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        {/* Main Application Routes */}

        <Route path='/formly/:id' element={
          <ProtectedRoute>
              <FormDetail/>
          </ProtectedRoute>
          }/>

          <Route path='/formly/forms' element={

            <ProtectedRoute>
              <FormList/>
            </ProtectedRoute>
            }/>

          <Route path="/formly" element={
            <ProtectedRoute>
              <FormBuilder token={localStorage.getItem("token")} />
            </ProtectedRoute>
            
            } />

        <Route path='/' element={<LandingPage/>}/>       
      </Routes>
    </Router>
  );
};

export default App;
