import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import EmailPromptForm from '../components/EmailPromptForm';
import EmailStatus from '../components/EmailStatus';
import Analytics from '../components/Analytics';
import { sendEmail, getStatus } from '../services/EmailServices';
import io from 'socket.io-client';

// Initialize socket for real-time updates
const socket = io('http://localhost:5000');

const Dashboard = ({ onLogout }) => {
  const [file, setFile] = useState(null);  // File for CSV data
  const [emailStatus, setEmailStatus] = useState([]);  // Status of sent emails
  const [analyticsData, setAnalyticsData] = useState({ totalEmails: 0, sentEmails: 0, failedEmails: 0 });
  const [emailStatuses, setEmailStatuses] = useState([]);  // Real-time email status updates

  // Real-time email status updates from the server
  useEffect(() => {
    socket.on('emailStatusUpdate', (statusUpdate) => {
      setEmailStatuses((prevStatuses) => [statusUpdate, ...prevStatuses]);
    });

    return () => {
      socket.off('emailStatusUpdate');
    };
  }, []);

  // Fetch email status from backend on component mount
  useEffect(() => {
    const fetchStatus = async () => {
      const status = await getStatus();
      setEmailStatus(status);
      updateAnalytics(status);
    };
    fetchStatus();
  }, []);

  // Updates analytics data based on email status
  const updateAnalytics = (statusData) => {
    const totalEmails = statusData.length;
    const sentEmails = statusData.filter(email => email.status === 'sent').length;
    const failedEmails = totalEmails - sentEmails;
    setAnalyticsData({ totalEmails, sentEmails, failedEmails });
  };

  // Handles file upload by setting the file state
  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  // Handles form submission for sending emails
  const handleEmailSend = async (prompt) => {
    if (!file) {
      alert("Please upload a CSV file first!");
      return;
    }

    const emailData = { prompt, recipient: 'example@example.com' }; // Mock data; actual file processing would happen here

    const result = await sendEmail(emailData);
    if (result) {
      alert(result.message);
      const updatedStatus = await getStatus();
      setEmailStatus(updatedStatus);
      updateAnalytics(updatedStatus);
    }
  };

  return (
    <>
      <div className="p-6 bg-background min-h-screen">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <FileUpload onUpload={handleFileUpload} />
        </div>
        <div className="mt-4">
          <EmailPromptForm onSubmit={handleEmailSend} />
        </div>
        <div className="mt-4">
          <EmailStatus emails={emailStatus} />
        </div>
        <div className="mt-4">
          <Analytics analyticsData={analyticsData} />
        </div>
      </div>

      {/* Real-time status updates */}
      <div className="p-6 bg-background min-h-screen">
        <h2 className="text-2xl font-bold text-primary mb-4">Email Status Updates</h2>
        <ul>
          {emailStatuses.map((status, index) => (
            <li key={index} className="mb-2">
              <strong>Recipient:</strong> {status.recipient}, <strong>Status:</strong> {status.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
