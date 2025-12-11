import { Routes, Route } from 'react-router-dom';import { Navbar } from "./components/Navbar"
import { RegistrationPage } from './pages/RegistrationPage';
import { Footer } from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';

 const App = () => {
  return (
    <>
      <Navbar/>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<RegistrationPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
      </main>
      <Footer/>
      </>
  )
}
export default App

