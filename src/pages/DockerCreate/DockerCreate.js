import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const useDockerCreate = (setContainerId, API_URL, providerId, containerId) => {
  const [containers, setContainers] = useState([]);
  const [imageName, setImageName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
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
      // console.log(imageName);

      await axios.post(
        API_URL + "/providers/images/pull",
        { image: imageName, providerId },
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
        { image: imageName, providerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.containerId);

      setContainerId(response.data.containerId);
      // containerId = response.data.container_id;
      alert(`Container created and started successfully`);
      // navigate(`/createContainer/${providerId}`);
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
