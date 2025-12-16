import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#f7f7f7', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </>
  )
}
