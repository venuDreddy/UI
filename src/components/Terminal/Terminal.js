import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import 'xterm/css/xterm.css';

export default function useTerminalLogic(containerId) {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const ws = useRef(null);
  const fitAddonRef = useRef(new FitAddon());

  useEffect(() => {
    const initializeTerminal = () => {
      if (terminalRef.current && !term.current) {
        // Initialize terminal
        term.current = new Terminal({
          cursorBlink: true,
          theme: {
            background: '#1e1e1e',
            foreground: '#ffffff',
            cursor: '#ffffff',
          },
        });

        // Load addons
        term.current.loadAddon(fitAddonRef.current);
        term.current.open(terminalRef.current);
        term.current.write(`\u001b[32mConnected to container ${containerId}\u001b[0m\r\n`);
        fitAddonRef.current.fit();

        // Initialize WebSocket connection
        ws.current = new W3CWebSocket(`ws://localhost:5000/api/docker/containers/${containerId}/terminal`);

        // WebSocket event handlers
        ws.current.onopen = () => {
          console.log('WebSocket connected');
        };

        ws.current.onmessage = (message) => {
          console.log('Received:', message.data);
          term.current.write(message.data);
        };

        ws.current.onerror = (error) => {
          console.error('WebSocket Error:', error);
        };

        ws.current.onclose = () => {
          console.log('WebSocket closed');
          term.current.write('\r\n\u001b[31mDisconnected from terminal\u001b[0m\r\n');
        };

        // Handle terminal input
        let commandBuffer = '';
        let cursorPosition = 0;
        term.current.onData((data) => {
          switch (data) {
            case '\r': // Enter key
              ws.current.send(commandBuffer);
              term.current.write('\r\n');
              cursorPosition = 0;
              commandBuffer = '';
              break;

            case '\x7f': // Backspace (DEL)
            case '\x08': // Backspace (BS)
              if (cursorPosition > 0) {
                term.current.write('\b \b');
                cursorPosition -= 1;
                commandBuffer = commandBuffer.slice(0, -1);
              }
              break;

            default:
              commandBuffer += data;
              term.current.write(data);
              cursorPosition += 1;
          }
        });

        // Handle terminal resize
        const resizeObserver = new ResizeObserver(() => {
          fitAddonRef.current.fit();
          ws.current.send(
            JSON.stringify({
              type: 'resize',
              cols: term.current.cols,
              rows: term.current.rows,
            })
          );
        });

        resizeObserver.observe(terminalRef.current);
      }
    };

    const timeoutId = setTimeout(initializeTerminal, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      term.current?.dispose();
      ws.current?.close();
    };
  }, [containerId]);

  return terminalRef;
}