import React,{useEffect, useState} from "react";
import { Header } from "../../components/Header/Header.jsx";
import { HeroSection } from "../../components/HeroSection/HeroSection.jsx";
import { Dashboard } from "../../components/Dashboard/Dashboard.jsx";
export function Homepage({
    active,
    setActive,
    navItems,
    href,
    token,
    setToken,API_URL
}){
    useEffect(() => {
        setToken(''||localStorage.getItem('Rstoken'));
        setActive(navItems[0]);
      }, []);
    return (
        <div>
        <Header active={active} setActive={setActive} navItems={navItems} href={href} API_URL={API_URL}/>
        <HeroSection active={active} setActive={setActive} API_URL={API_URL}/>
        <Dashboard token = {token} active={active} setActive={setActive} API_URL={API_URL}/>
        <center>

        {token == undefined ? (
            <>
          <a href="/login" className="button">
            <p className="text-xl">Log-in</p>
          </a>
          <p className="text-lg md:text-2xl text-indigo-300 mb-10">
            Your computer’s idle power can change the world. Join the revolution
            today.
          </p>
        </>
      ) : (
          <>
          <div className="button-container flex flex-col items-center">
            <a href="/providers" className="button">
              Request Computational Power
            </a>
            <a href="/providerdashboard" className="button">
              Share Your Resources
            </a>
          </div>
          <p className="text-lg md:text-2xl text-indigo-300 mb-10">
            Together, we can solve bigger problems. Share your power or tap into
            ours today.
          </p>
        </>
      )}
      </center>
        </div>
    );
} 