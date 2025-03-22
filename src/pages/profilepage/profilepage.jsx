import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Settings } from '../../components/Settings/Settings.jsx';
import { handleLogout } from './profilepage.js';
import { useNavigate } from 'react-router-dom';

export const Profilepage = ({ active, setActive, navItems, href, token, setToken,API_URL}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setToken(''||localStorage.getItem('Rstoken'));
    setActive(navItems[3]);
  }, []);
  return (
    <>
      <Header
        active={active}
        setActive={setActive}
        navItems={navItems}
        href={href}
      />
      {/* {token&&<Settings token={token}>
      
      </Settings>} */}
      <center>
        <button className='button' onClick={()=>handleLogout(navigate,API_URL)}> {token?"Log out":"Log in"}</button>
        </center> 
    </>
  );
};
