import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GaugeMeter } from '../../components/GaugeMeter/GaugeMeter.jsx';
import { requestContainer } from './Provider.js';

import './Provider.css';
export const Provider = ({ provider, API_URL, providerId,
  containerId,
  setProviderId,
  setContainerId }) => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();
  return (
    <div
      key={provider.id}
      className="provider shadow-lg rounded-2xl bg-white border border-gray-200"
    >
      <div className="flex justify-between items-center">
        <div className="name flex flex-col justify-center items-center">
          <span className="text">{provider.name}</span>
        </div>

        <button
          onClick={() =>
            setExpanded(expanded === provider.id ? null : provider.id)
          }
          className="button" 
        >
          {expanded === provider.id ? 'Hide' : 'Details'}
        </button>
      </div>

      {expanded === provider.id && (
        <div className="provider-stats rounded-lg flex flex-col">
          <div className="flex justify-center">
            {Object.entries(provider.stats).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <GaugeMeter value={value} label={key.toUpperCase()} />
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-600"
            onClick={() => {
              setProviderId(provider.id);
              requestContainer(provider.id, navigate, API_URL,setProviderId);
            }}
          >
            Request Resources
          </button>
        </div>
      )}
    </div>
  );
};
