import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage/Homepage.jsx";
import { AuthPage } from "../pages/Authpage/Authpage.jsx";
import { Profilepage } from "../pages/profilepage/profilepage.jsx";
import { ProvidersList } from "../pages/ProvidersList/ProvidersList.jsx";
import { Providerdashboard } from "../pages/Providerdashboard/Providerdashboard.jsx";
import { DockerConsumer } from "../pages/CreateContainer/CreateContainer.jsx";
import "./App.css";

export function App() {
  const [active, setActive] = useState("Home");
  const [token, setToken] = useState(localStorage.getItem("Rstoken") || "");
  const [containerId, setContainerId] = useState("");
  const [providerId, setProviderId] = useState("");
  const navItems = ["Home", "Dashboard", "Profile"];
  const href = ["/", "/#dashboard", "/profile"];
  const API_URL = "http://localhost:8080/api";
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Homepage
              active={active}
              setActive={setActive}
              token={token}
              navItems={navItems}
              href={href}
              setToken={setToken}
            />
          }
        />
        <Route
          path='/login'
          element={<AuthPage login={true} API_URL={API_URL} />}
        />
        <Route
          path='/signup'
          element={<AuthPage login={false} API_URL={API_URL} />}
        />
        <Route
          path='/profile'
          element={
            <Profilepage
              active={active}
              setActive={setActive}
              token={token}
              navItems={navItems}
              href={href}
              setToken={setToken}
              API_URL={API_URL}
            />
          }
        />
        <Route
          path='/providers'
          element={
            <ProvidersList
              token={token}
              providerId={providerId}
              containerId={containerId}
              setProviderId={setProviderId}
              setContainerId={setContainerId}
              active={active}
              setActive={setActive}
              navItems={navItems}
              href={href}
              API_URL={API_URL}
            />
          }
        />
        <Route
          path='/providerdashboard'
          element={
            <Providerdashboard
              token={token}
              active={active}
              setActive={setActive}
              navItems={navItems}
              href={href}
              setToken={setToken}
              API_URL={API_URL}
            />
          }
        />
        <Route
          path='/createContainer/:providerId'
          element={
            <DockerConsumer
              token={token}
              containerId={containerId}
              setProviderId={setProviderId}
              setContainerId={setContainerId}
              active={active}
              setActive={setActive}
              navItems={navItems}
              href={href}
              setToken={setToken}
              API_URL={API_URL}
            />
          }
        />
      </Routes>
    </Router>
  );
}
