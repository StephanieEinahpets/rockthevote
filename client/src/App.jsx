import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Public from './components/Public.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {UserContext} from './context/UserProvider.jsx'
import axios from 'axios'
import './App.css'

function App() {
  const { token, logout, getAllComments, comments } = useContext(UserContext)
  

  useEffect( () => {
    getAllComments()
  }, [token] )

  return (
    < >
        <Navbar logout={logout} token={token}/>
        <Routes>
          <Route
          path ="/"
          element={ token ? <Navigate to="/profile"/> : <Auth />}
          />
          <Route
          path ="/profile"
          element={<ProtectedRoute token={token}> 
            <Profile />
          </ProtectedRoute>}
          />
          <Route path ="/public" element={<Public />}/>
        </Routes> 
    </>
  )
}

export default App
