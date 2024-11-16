import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this URL based on your backend setup

/**
 * Sends an email using provided email data and prompt.
 * @param {Object} emailData - The data used to generate the email.
 * @returns {Promise<Object>} - Returns a response indicating success or failure.
 */
export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/emails/send`, emailData);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

/**
 * Retrieves the status of all sent emails.
 * @returns {Promise<Array>} - Returns an array of email statuses.
 */
export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emails/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching email status:', error);
    return [];
  }
};
