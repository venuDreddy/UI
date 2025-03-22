import React from 'react';
import { FaFolder, FaFile } from 'react-icons/fa'; // Icons for directories and files
import './FileExplorer.css';

const FileExplorer = ({ files, onFileClick }) => {
  // Parse the files string into an array of file/directory objects
  const parsedFiles = files // Split the string by newlines
    .filter((item) => item.trim() !== '') // Remove empty lines
    .map((item) => ({
      name: item.trim(), // Remove leading/trailing whitespace
      isDirectory: item.endsWith('/'), // Check if it's a directory
    }));

  return (
    <div className="file-explorer p-3 bg-gray-700">
      <h3 className="text-lg font-semibold mb-3">File Explorer</h3>
      <ul>
        {parsedFiles.map((file, index) => (
          <li
            key={index}
            onClick={() => onFileClick(file.name)}
            className="cursor-pointer text-sm py-1 border-b border-gray-600 hover:bg-gray-600 flex items-center gap-2"
          >
            {/* Render folder icon for directories, file icon for files */}
            {file.isDirectory ? (
              <FaFolder className="text-yellow-500" />
            ) : (
              <FaFile className="text-blue-500" />
            )}
            {/* Display the file/directory name */}
            <span>{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;