import { useState } from "react";
import axios from "axios";

const useDockerCreate = (setContainerId, API_URL, providerId) => {
  const [containers, setContainers] = useState([]);
  const [imageName, setImageName] = useState("");
  const [password, setPassword] = useState("");

  const fetchContainers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        API_URL + "/providers/containers",
        { providerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContainers(response.data.containers);
    } catch (err) {
      console.error(err);
    }
  };

  const pullImage = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      // let providerID="localhost";
      console.log(providerId);

      await axios.post(
        API_URL + "/providers/images/pull",
        { imageName, providerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Image ${imageName} pulled successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  const createContainer = async () => {
    try {
      const token = localStorage.getItem("token");
      // const portBindings = {
      //     [`${containerPort}/tcp`]: [{ HostPort: hostPort }],
      // };

      const response = await axios.post(
        API_URL + "/providers/containers/create",
        { imageName, providerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContainerId(response.data.container_id);
      alert(`Container created and started successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    containers,
    imageName,
    password,
    setImageName,
    setPassword,
    fetchContainers,
    pullImage,
    createContainer,
  };
};

export default useDockerCreate;
