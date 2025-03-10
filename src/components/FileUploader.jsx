import React, { useState, useRef } from 'react';
import '../styles/FileUploader.css';

const FileUploader = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    if (!file.name.endsWith('.kml')) {
      alert('Please upload a valid KML file.');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      onFileUpload(fileData);
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      console.error('Error reading file');
      alert('Error reading file. Please try again.');
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="file-uploader">
      <div 
        className={`drop-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".kml"
          onChange={handleFileChange}
          className="file-input"
        />
        
        {isUploading ? (
          <div className="uploading">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt"></i>
            <p>{fileName || 'Drag & drop your KML file or click to browse'}</p>
            <span className="file-hint">Accepts KML files only</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;