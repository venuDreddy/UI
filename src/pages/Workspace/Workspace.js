import { useState, useEffect } from 'react';
import axios from 'axios';

const useWorkspaceLogic = (containerId, setContainerId, API_URL) => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const token = localStorage.getItem('token');

  // Fetch files in the root directory
  const fetchFiles = async () => {
    try {
      const response = await axios.post(
        API_URL + '/api/docker/files/list',
        { containerId, dirPath: '/app' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFiles(response.data.files.split('\n'));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Read a file
  const readFile = async (file) => {
    try {
      const newFile = file.replace(/[^\x20-\x7E]/g, '');
      const response = await axios.post(
        API_URL + '/api/docker/files/read',
        { containerId, filePath: '/app/' + newFile },
        { headers: { Authorization: `Bearer ${token}` }, responseType: 'json' }
      );
      let newFileContent = response.data.content;
      while (newFileContent.length > 0 && newFileContent.charCodeAt(0) <= 31) {
        newFileContent = newFileContent.slice(1);
      }
      setCurrentFile(newFile);
      setFileContent(newFileContent);
    } catch (err) {
      console.error(err);
    }
  };

  // Save a file
  const saveFile = async () => {
    let fileToSave = currentFile;
    if (!currentFile) {
      const newFile = prompt('Please enter a file name:');
      if (!newFile) {
        alert('File name cannot be empty');
        return;
      }
      fileToSave = newFile;
      setCurrentFile(newFile);
    }
    try {
      await axios.post(
        API_URL + '/api/docker/files/write',
        { containerId, filePath: '/app/' + fileToSave, content: fileContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  // Stop container
  const exit = async () => {
    try {
      await axios.post(
        API_URL + `/api/docker/containers/${containerId}/stop`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContainerId('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    currentFile,
    fileContent,
    fetchFiles,
    readFile,
    saveFile,
    exit,
    setFileContent,
    setCurrentFile,
  };
};

export default useWorkspaceLogic;