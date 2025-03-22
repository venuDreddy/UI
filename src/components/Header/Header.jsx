import React, { useState } from 'react';
import './Header.css';

export function Header({ active, setActive, navItems, href }) {
  const token = localStorage.getItem('Rstoken');
  return (
    <>
      <div className="fixed w-full flex justify-between items-center p-4 shadow-md bg-white">
        <div className="image-container text-xl font-bold flex items-center">
          <img src="./logo (2).png" alt="" className="image" />
          <span className="text ml-2">ResourceShare</span>
        </div>
        <div className="header-menu space-x-6 hidden md:flex">
          {navItems.map((item, index) => (
            <a
              href={href[index]} // Ensure href array is defined
              key={item}
              className={`header-menu-item ${
                active === item
                  ? 'text-blue-500 border-b-2 border-blue-500 pb-1'
                  : 'text-gray-600'
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="button-container space-x-4 hidden md:flex">
          {!token&&
          <a href="/signup" className="button">
            Signup
          </a>
        }
        </div>
      </div>
      <div className="container"></div>
    </>
  );
}
