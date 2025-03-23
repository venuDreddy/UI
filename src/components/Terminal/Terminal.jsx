import React from "react";
import useTerminalLogic from "./Terminal.js";
import "./Terminal.css";

export default function TerminalComponent({
  containerId,
  API_URL,
  providerId,
}) {
  const terminalRef = useTerminalLogic(containerId, providerId);

  return (
    <div
      ref={terminalRef}
      className='terminal-container'
      style={{ width: "100%", height: "99%" }}
    />
  );
}
