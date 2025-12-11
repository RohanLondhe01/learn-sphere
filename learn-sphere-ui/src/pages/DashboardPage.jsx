import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const DashboardPage = () => {
    const location=useLocation()
    const name=location.state?.name || 'Student'

  return (
    <section>
        <h2>Welcome, {name}!</h2>
        <p>Your courses will appear here</p>
        <div>
            <h3>Enrolled courses</h3>
            <ul>
                <li>Course placeholder 1</li>
                <li>Course placeholder 2</li>
            </ul>
        </div>

        <div>
            <Link to="/">Back to Registration</Link>
        </div>
    </section>
  )
}
