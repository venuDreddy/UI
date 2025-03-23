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
  // containerId = sessionStorage.getItem(containerId);
  // console.log(containerId);

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
      containerId={containerId}
    />
  );
};

export { DockerConsumer };
