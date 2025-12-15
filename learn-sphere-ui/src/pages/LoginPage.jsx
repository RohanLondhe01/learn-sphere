import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }
  const submit = e => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    navigate('/dashboard', { state: { name: email.split('@')[0] || 'Student' } })
  }

  return (
    <section style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          style={inputStyle}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          style={inputStyle}
        />

        <div style={{ marginBottom: '1rem' }}>
          <a
            href="#"
            onClick={e => e.preventDefault()}
            style={{ color: '#007bff' }}
          >
            Forgot password?
          </a>
        </div>

        <button type="submit">Sign In</button>
      </form>
    </section>
  )
}
