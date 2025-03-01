import { Button } from '@mantine/core';
import React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

interface FileUploadProps extends Omit<DropzoneOptions, 'onDrop'> {
  activeText: string;
  inactiveText: string;
  maxFiles?: number;
  onDrop: (acceptedFiles: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onDrop,
  accept,
  maxFiles,
  maxSize,
  activeText,
  inactiveText,
}) => {
  const handleDrop = (acceptedFiles: File[]) => {
    if (maxFiles && acceptedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    onDrop(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />

      <Button
        onClick={open}
        variant="outline"
        color="blue"
        w={'100%'}
        style={{ cursor: 'pointer', border: '1px dashed' }}
      >
        {isDragActive ? activeText : inactiveText}
      </Button>
    </div>
  );
};

export default FileUpload;
