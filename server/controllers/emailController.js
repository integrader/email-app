import EmailStatus from '../models/emailStatus.js';
import { sendEmail , scheduleEmail} from '../services/emailService.js';
import { emitEmailStatus } from '../server.js';

export const sendEmails = async (req, res) => {
    const { recipient, subject, message } = req.body;
    try {
      const success = await sendEmail(recipient, subject, message);
      const status = success ? 'Sent' : 'Failed';
  
      const emailStatus = new EmailStatus({ recipient, subject, status });
      await emailStatus.save();
  
      // Emit the status update in real-time
      emitEmailStatus({ recipient, subject, status });
      res.json({ message: 'Email processed', status });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
};

export const getEmailStatus = async (req, res) => {
  try {
    const emailStatuses = await EmailStatus.find();
    res.status(200).json({ success: true, emailStatuses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
