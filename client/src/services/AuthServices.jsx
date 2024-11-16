import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Backend base URL

/**
 * Registers a new user with name, email, and password.
 * @param {Object} userDetails - The registration details (name, email, and password).
 * @returns {Promise<Object>} - Returns the registration response if successful.
 */
export const register = async (userDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userDetails);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Failed to register' };
  }
};

/**
 * Logs in the user with email and password.
 * @param {Object} credentials - The login credentials (email and password).
 * @returns {Promise<Object>} - Returns the login response, including authentication tokens if successful.
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token); // Store token in local storage
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Failed to login' };
  }
};

/**
 * Logs out the user by removing the authentication token.
 */
export const logout = () => {
  localStorage.removeItem('token'); // Clear token from local storage
};

/**
 * Checks if the user is authenticated by verifying the presence of a token.
 * @returns {boolean} - Returns true if a token is present, false otherwise.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
