import React,{useEffect, useState} from "react";
import { Dashboard } from "../../components/Dashboard/Dashboard.jsx";
export function Providerdashboard({
    active,
    setActive,
    navItems,
    href,
    token,
    setToken,
    API_URL
}){
    useEffect(() => {
        setToken(''||localStorage.getItem('Rstoken'));
        setActive(navItems[1]);
      }, []);
    return (
        <div>
        <Dashboard token = {token} active={active} setActive={setActive} API_URL={API_URL}/>
        </div>
    );
} 