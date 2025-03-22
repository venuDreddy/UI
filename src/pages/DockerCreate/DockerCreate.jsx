import React from 'react';
import useDockerCreate from './DockerCreate.js';
import './DockerCreate.css';

function DockerCreate({ setContainerId }) {
    const {
        containers,
        imageName,
        password,
        setImageName,
        setPassword,
        fetchContainers,
        pullImage,
        createContainer
    } = useDockerCreate(setContainerId);

    return (
        <div className="CreateContainer p-6">
            <h2 className="text-2xl font-bold mb-4 ">Docker Consumer</h2>
            <button
                onClick={fetchContainers}
                className=" text-white px-4 py-2 rounded-md transition-colors mb-4"
            >
                Fetch Containers
            </button>
            <ul className="mb-6">
                {containers.map((container) => (
                    <li key={container.Id} className="bg-white p-3 rounded-md shadow-sm mb-2">
                        {container.Names[0]} - {container.State}
                    </li>
                ))}
            </ul>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Pull Image</h3>
                <input
                    type="text"
                    placeholder="Image name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                    onClick={pullImage}
                    className="bg-green-500 text-white px-4 py-2 rounded-md "
                >
                    Pull Image
                </button>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2 ">Create Container</h3>
                <input
                    type="text"
                    placeholder="Image name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                    onClick={createContainer}
                    className="text-white px-4 py-2 rounded-md"
                >
                    Create Container
                </button>
            </div>
        </div>
    );
}

export default DockerCreate;