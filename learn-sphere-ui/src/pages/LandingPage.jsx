import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
          color: 'white',
          textAlign: 'center',
          padding: '6rem 2rem'
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Student Portal
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Your gateway to learning, progress, and success.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link
            to="/register"
            style={{
              background: 'white',
              color: '#4f46e5',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Register
          </Link>
          <Link
            to="/login"
            style={{
              background: 'transparent',
              border: '2px solid white',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '250px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📚 Easy Registration</h3>
          <p>Sign up quickly and access your dashboard instantly.</p>
        </div>
        <div style={{ maxWidth: '250px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯 Track Progress</h3>
          <p>Stay on top of your courses and assignments.</p>
        </div>
        <div style={{ maxWidth: '250px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐 Access Anywhere</h3>
          <p>Use the portal from any device, anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
