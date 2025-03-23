import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header.jsx";
import { Provider } from "../../components/Provider/Provider.jsx";
import { useNavigate } from "react-router-dom";
import { fetchProvidersList } from "./ProvidersList.js"; // Import fetching function
import "./ProvidersList.css";

export const ProvidersList = ({
  active,
  setActive,
  navItems,
  href,
  API_URL,
  providerId,
  containerId,
  setProviderId,
  setContainerId,
}) => {
  const navigate = useNavigate();
  console.log(providerId + " " + containerId);
  if (containerId && providerId) navigate("/createContainer");
  const [providersList, setProvidersList] = useState([]);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    setActive(navItems[1]);

    const loadProviders = async () => {
      const data = await fetchProvidersList(API_URL);
      setProvidersList(data);
    };

    loadProviders();
  }, []);

  return (
    <>
      <Header
        active={active}
        setActive={setActive}
        navItems={navItems}
        href={href}
        API_URL={API_URL}
      />
      <div className='providers-list flex flex-col justify-center items-center'>
        {providersList.length > 0 ? (
          providersList.map((provider) => {
            console.log(provider.providerID);

            return (
              <Provider
                key={provider.providerID}
                provider={provider}
                API_URL={API_URL}
                providerId={provider.providerID}
                containerId={containerId}
                setProviderId={setProviderId}
                setContainerId={setContainerId}
              />
            );
          })
        ) : (
          <p>Loading providers...</p>
        )}
      </div>
    </>
  );
};
