import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const DashboardPage = () => {
    const location=useLocation()
    const name=location.state?.name || 'Student'

  return (
    <section style={{ maxWidth: 720, margin: '2rem auto' }}>
        <h2>Welcome, {name}!</h2>
        <p>Your courses will appear here</p>
        <div style={{ marginTop: '1.5rem' }}>
            <h3>Enrolled courses</h3>
            <ul>
                <li>Course placeholder 1</li>
                <li>Course placeholder 2</li>
            </ul>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
            <Link to="/">Back to Registration</Link>
        </div>
    </section>
  )
}
