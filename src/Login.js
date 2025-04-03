import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !regNumber.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    onLogin(name, regNumber);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Rent a Cycle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="regNumber">Registration Number</label>
            <input
              type="text"
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Enter your registration number"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Login</button>
          <div className="back-link">
            <a href="/">Back to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;