import React from 'react';

const EmailStatus = ({ emails }) => {
  return (
    <div className="p-4 mt-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary mb-4">Email Status</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b text-left">Recipient</th>
            <th className="p-2 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={index} className="hover:bg-background transition-all duration-200">
              <td className="p-2 border-b">{email.recipient}</td>
              <td className={`p-2 border-b ${email.status === 'sent' ? 'text-green-500' : 'text-red-500'}`}>
                {email.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailStatus;
