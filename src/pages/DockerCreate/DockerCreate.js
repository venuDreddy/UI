import { useState } from 'react';
import axios from 'axios';

const useDockerCreate = (setContainerId) => {
    const [containers, setContainers] = useState([]);
    const [imageName, setImageName] = useState('');
    const [password, setPassword] = useState('');

    const fetchContainers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/providers/containers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContainers(response.data.containers);
        } catch (err) {
            console.error(err);
        }
    };

    const pullImage = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log(token);
            // let providerID="localhost";
            
            await axios.post(
                'http://localhost:8080/api/providers/images/pull',
                { imageName }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Image ${imageName} pulled successfully`);
        } catch (err) {
            console.error(err);
        }
    };

    const createContainer = async () => {
        try {
            const token = localStorage.getItem('token');
            // const portBindings = {
            //     [`${containerPort}/tcp`]: [{ HostPort: hostPort }],
            // };

            const response = await axios.post(
                'http://localhost:8080/api/providers/containers/create',
                { imageName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContainerId(response.data.container_id);
            alert(`Container ${containerName} created and started successfully`);
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
        createContainer
    };
};

export default useDockerCreate;