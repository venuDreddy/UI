import React from "react";
import {createRoot} from 'react-dom/client';
import { App } from "../App/App.jsx";
import "./main.css";


const root = createRoot(document.getElementById("root"));

root.render(<App/>);