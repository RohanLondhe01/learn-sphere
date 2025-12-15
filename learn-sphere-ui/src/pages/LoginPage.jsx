import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const navigate = useNavigate()
  return (
    <form style={{maxWidth:480,margin:'3rem auto'}} onSubmit={e=>{e.preventDefault();navigate('/dashboard',{state:{name:(e.currentTarget.email.value||'Student').split('@')[0]}})}}>
      <h2>Login</h2>
      <p style={{ margin: 0 }}>Email</p>
      <input name="email" type="email" placeholder="Email" style={{width:'100%',padding:'0.5rem',margin:'0.5rem 0'}} />
      <p style={{ margin: 0 }}>Password</p>
      <input name="password" type="password" placeholder="Password" style={{width:'100%',padding:'0.5rem',margin:'0.5rem 0'}} />
      <div style={{textAlign:'right'}}><a href="/forgot-password" onClick={e=>e.preventDefault()}>Forgot?</a></div>
      <button type="submit">Sign In</button>
    </form>
  )
}
