import EmailStatus from '../models/emailStatus.js';

/**
 * Fetches analytics data for email campaigns.
 * @returns {Promise<Object>} - An object containing email analytics data.
 */
export const fetchAnalytics = async () => {
  try {
    const totalEmails = await EmailStatus.countDocuments();
    const sentEmails = await EmailStatus.countDocuments({ status: 'Sent' });
    const failedEmails = await EmailStatus.countDocuments({ status: 'Failed' });
    const scheduledEmails = await EmailStatus.countDocuments({ status: 'Scheduled' });

    return {
      totalEmails,
      sentEmails,
      failedEmails,
      scheduledEmails,
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error.message);
    return {
      totalEmails: 0,
      sentEmails: 0,
      failedEmails: 0,
      scheduledEmails: 0,
    };
  }
};
