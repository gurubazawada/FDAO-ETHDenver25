import React, { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="mt-2">
      <input
        accept=".ipynb"
        style={{ display: "none" }}
        id="ipynb-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="ipynb-upload" className="cursor-pointer">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Upload ipynb File
        </button>
      </label>
      {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
