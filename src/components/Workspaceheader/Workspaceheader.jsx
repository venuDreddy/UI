import React from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { LuRefreshCcw } from 'react-icons/lu';
import './Workspaceheader.css';

const WorkspaceHeader = ({ onNewFile, onSaveFile, onExit, onRefresh }) => {
  return (
    <div className="workspace-header p-3">
      <button onClick={onNewFile} className=" bg-blue-500 rounded hover:bg-blue-600">
        <FaPlus />
      </button>
      <button onClick={onSaveFile} className=" bg-green-500 rounded hover:bg-green-600">
        <FaSave />
      </button>
      <button onClick={onExit} className=" bg-red-500 rounded hover:bg-red-600">
        <FaTimes />
      </button>
      <button onClick={onRefresh} className=" bg-yellow-500 rounded hover:bg-yellow-600">
        <LuRefreshCcw />
      </button>
    </div>
  );
};

export default WorkspaceHeader;