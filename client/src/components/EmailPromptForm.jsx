import React, { useState } from 'react';

const EmailPromptForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  // Handles prompt submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(prompt);
    }
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 mt-4 bg-white shadow-md rounded-lg">
      <label className="text-primary font-semibold mb-2">Email Prompt</label>
      <textarea
        className="p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for personalizing emails"
        required
      />
      <button
        type="submit"
        className="mt-4 p-2 bg-primary text-black font-semibold rounded-lg hover:bg-secondary transition-all duration-300"
      >
        Generate and Send Emails
      </button>
    </form>
  );
};

export default EmailPromptForm;
