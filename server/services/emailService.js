import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends an email using an external Email Service Provider.
 * @param {string} recipient - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The body content of the email.
 * @returns {Promise<boolean>} - Returns true if the email was sent successfully.
 */
export const sendEmail = async (recipient, subject, message) => {
  try {
    const response = await axios.post(
      process.env.ESP_API_URL,
      {
        personalizations: [{ to: [{ email: recipient }] }],
        from: { email: process.env.FROM_EMAIL },
        subject,
        content: [{ type: 'text/plain', value: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ESP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 202) {
      console.log(`Email successfully sent to ${recipient}`);
      return true;
    } else {
      console.error(`Failed to send email to ${recipient}:`, response.data);
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
};

/**
 * Schedules an email to be sent at a specific time.
 * @param {string} recipient - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The email body content.
 * @param {Date} sendAt - The scheduled time for sending the email.
 * @returns {Promise<boolean>} - Returns true if the email was scheduled successfully.
 */
export const scheduleEmail = async (recipient, subject, message, sendAt) => {
  try {
    const response = await axios.post(
      process.env.ESP_API_URL,
      {
        personalizations: [
          { to: [{ email: recipient }], send_at: Math.floor(new Date(sendAt).getTime() / 1000) },
        ],
        from: { email: process.env.FROM_EMAIL },
        subject,
        content: [{ type: 'text/plain', value: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ESP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 202) {
      console.log(`Email scheduled successfully for ${recipient} at ${sendAt}`);
      return true;
    } else {
      console.error(`Failed to schedule email to ${recipient}:`, response.data);
      return false;
    }
  } catch (error) {
    console.error('Error scheduling email:', error.message);
    return false;
  }
};
