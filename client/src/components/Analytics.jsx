import React from 'react';

const Analytics = ({ analyticsData }) => {
  const totalEmails = analyticsData?.totalEmails || 0;
  const sentEmails = analyticsData?.sentEmails || 0;
  const failedEmails = analyticsData?.failedEmails || 0;

  return (
    <div className="p-4 mt-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary mb-4">Email Analytics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-background rounded-lg text-center">
          <h3 className="text-lg font-semibold text-secondary">Total Emails</h3>
          <p className="text-2xl font-bold text-primary">{totalEmails}</p>
        </div>
        <div className="p-4 bg-background rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-500">Sent Emails</h3>
          <p className="text-2xl font-bold text-green-600">{sentEmails}</p>
        </div>
        <div className="p-4 bg-background rounded-lg text-center">
          <h3 className="text-lg font-semibold text-red-500">Failed Emails</h3>
          <p className="text-2xl font-bold text-red-600">{failedEmails}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
