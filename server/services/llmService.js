import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generates a customized email message using an LLM API.
 * @param {string} recipientEmail - The email address of the recipient.
 * @param {string} prompt - The base prompt or template to customize.
 * @returns {Promise<string>} - A personalized email message.
 */
export const generateCustomMessage = async (recipientEmail, prompt) => {
  try {
    // Replace this with actual LLM API call for real implementation
    const response = await axios.post(
      process.env.LLM_API_URL,
      { recipientEmail, prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        },
      }
    );

    return response.data.generatedMessage;
  } catch (error) {
    console.error('Error generating custom message:', error);
    // Fallback message in case LLM service fails
    return `Hello ${recipientEmail},\n\n${prompt}`;
  }
};
