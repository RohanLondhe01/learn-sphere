import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RegistrationPage } from './pages/RegistrationPage';
import { Footer } from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import { Profile } from './pages/Profile';
import NotificationsList from './components/NotificationsList'; // ✅ add this import
import ModulePage from "./components/CourseoverviewPanel/ModulePage";
import NotEnrolledPage from "./components/CourseoverviewPanel/NotEnrolledPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { Footer } from "./components/Footer";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<NotificationsList />} />

          {/* Course module routes */}
          <Route path="/course/:courseId/module/:moduleId" element={<ModulePage />} />
          <Route path="/not-enrolled/:courseId/module/:moduleId" element={<NotEnrolledPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

