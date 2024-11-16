import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Handle Login API Call
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token for future requests
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert(data.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again.');
    }
  };

  // Handle Register API Call
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now log in.');
        setIsRegistering(false); // Switch back to login mode
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-4 text-sm text-blue-500 hover:underline"
        >
          {isRegistering ? 'Back to Login' : 'Create a New Account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
