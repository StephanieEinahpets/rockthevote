import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
    const {logout, token} = props

  return (
    <div className="navbar">
      {token && <Link to="/profile" style={{ padding:5, textDecoration: 'none', color: 'inherit' }}>Profile</Link>}
      <Link to="/public" style={{ padding:5, textDecoration: 'none', color: 'inherit' }}>The Issues</Link>
      {token && <button onClick={logout}>Log Out</button>}
    </div>
  )
}