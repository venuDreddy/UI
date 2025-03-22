import React, { useState, useEffect } from 'react';
import DockerCreate from '../DockerCreate/DockerCreate.jsx';
import Workspace from '../Workspace/Workspace.jsx';

const DockerConsumer = ({API_URL, containerId, setContainerId}) => {

useEffect(() => {
  sessionStorage.setItem('containerId', containerId);
}, [containerId]);

  return (
    (containerId)?<Workspace containerId={containerId} API_URL={API_URL} setContainerId={setContainerId}/>:<DockerCreate setContainerId={setContainerId}/>
  );
};

export  {DockerConsumer};