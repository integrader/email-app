import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  // Handles file selection and calls the onUpload callback with the selected file
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (onUpload) {
      onUpload(uploadedFile);
    }
  };

  return (
    <div className="p-4 border-dashed border-2 border-primary rounded-lg bg-background text-center hover:bg-accent hover:bg-opacity-20 transition-all duration-300">
      <label className="cursor-pointer text-primary font-semibold">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".csv"
        />
        {file ? file.name : "Upload CSV File"}
      </label>
    </div>
  );
};

export default FileUpload;
