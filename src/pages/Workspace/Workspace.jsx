import React from "react";
import Editor from "@monaco-editor/react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import TerminalComponent from "../../components/Terminal/Terminal.jsx";
import useWorkspaceLogic from "./Workspace.js";
import Workspaceheader from "../../components/Workspaceheader/Workspaceheader.jsx";
import FileExplorer from "../../components/FileExplorer/FileExplorer.jsx";

const Workspace = ({ containerId, setContainerId, API_URL, providerId }) => {
  const {
    files,
    currentFile,
    fileContent,
    fetchFiles,
    readFile,
    saveFile,
    exit,
    setFileContent,
  } = useWorkspaceLogic(containerId, setContainerId, API_URL);

  return (
    <div className='Workspace flex flex-col h-screen w-screen bg-gray-900 text-white'>
      {/* Main Content */}
      <PanelGroup direction='horizontal' className='flex-1'>
        {/* File Explorer */}
        <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Workspaceheader></Workspaceheader>
          <div className='p-3 bg-gray-700'>
            <FileExplorer
              files={["src/", "public/", "index.js", "README.md"]}
            ></FileExplorer>
          </div>
        </Panel>
        <PanelResizeHandle className='w-1 bg-gray-600 hover:bg-gray-500' />

        {/* Editor and Terminal */}
        <Panel>
          <PanelGroup direction='vertical'>
            {/* File Editor */}
            <Panel>
              <div className='bg-gray-800 h-full'>
                <h3 className='text-lg font-semibold mb-3'>
                  File Editor: {currentFile}
                </h3>
                <Editor
                  height='100%'
                  theme='vs-dark'
                  value={fileContent}
                  API_URL={API_URL}
                  onChange={(value) => setFileContent(value)}
                />
              </div>
            </Panel>
            <PanelResizeHandle className='h-1 bg-gray-600 hover:bg-gray-500' />

            {/* Terminal */}
            <Panel defaultSize={50} minSize={15} maxSize={95}>
              <div className='p-3 bg-gray-700 h-full'>
                <h3 className='text-lg font-semibold mb-3'>Terminal</h3>
                <TerminalComponent
                  containerId={containerId}
                  API_URL={API_URL}
                  providerId={providerId}
                />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Workspace;
