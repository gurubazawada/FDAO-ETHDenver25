import React, { ChangeEvent } from "react";

interface FileUploadProps {
  text?: string;
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  text = "Upload File",
  onFileSelect,
  accept,
  multiple = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      onFileSelect(filesArray);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      {text && <p>{text}</p>}
    </div>
  );
};

export default FileUpload;
