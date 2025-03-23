import React, { useEffect } from "react";
import DockerCreate from "../DockerCreate/DockerCreate.jsx";
import Workspace from "../Workspace/Workspace.jsx";
import { useParams } from "react-router-dom";

const DockerConsumer = ({ API_URL, containerId, setContainerId }) => {
  useEffect(() => {
    sessionStorage.setItem("containerId", containerId);
  }, [containerId]);
  let { providerId } = useParams();
  console.log(providerId);

  return containerId ? (
    <Workspace
      containerId={containerId}
      API_URL={API_URL}
      providerId={providerId}
      setContainerId={setContainerId}
    />
  ) : (
    <DockerCreate
      setContainerId={setContainerId}
      API_URL={API_URL}
      providerId={providerId}
    />
  );
};

export { DockerConsumer };
