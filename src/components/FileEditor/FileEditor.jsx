import React from 'react';
import Editor from '@monaco-editor/react';

const FileEditor = ({ fileContent, onContentChange }) => {
  return (
    <div className="bg-gray-800 h-full">

      <Editor
        height="100%"
        theme="vs-dark"
        value={fileContent}
        onChange={onContentChange}
      />
    </div>
  );
};

export default FileEditor;