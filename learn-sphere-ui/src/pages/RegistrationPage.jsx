
import { RegistrationForm } from '../components/RegistrationForm'

export const RegistrationPage = () => {
  return (
    <>
    <section style={{ maxWidth: 480, margin: '2rem auto' }}>
        <h2>Student Registration</h2>
        <p>Register to access courses and learning matrials.</p>
        <RegistrationForm/>
    </section>
    </>
  )
}
