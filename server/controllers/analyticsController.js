import EmailStatus from '../models/emailStatus.js';

export const getAnalytics = async (req, res) => {
  try {
    const totalEmails = await EmailStatus.countDocuments();
    const sentEmails = await EmailStatus.countDocuments({ status: 'Sent' });
    const failedEmails = await EmailStatus.countDocuments({ status: 'Failed' });

    res.status(200).json({
      success: true,
      analytics: { totalEmails, sentEmails, failedEmails },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
