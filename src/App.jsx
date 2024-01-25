import {useEffect, useRef, useState} from 'react'
import './App.scss'
import MainInput from "./Components/MainInput.jsx";
import Task from "./Components/Task.jsx";
import { Reorder} from "framer-motion";
import Header from "./Components/Header.jsx";
import Login from "./Components/Login.jsx";
import Registration from "./Components/Registration.jsx";
import {Route, Routes} from 'react-router-dom'
import Home from "./Components/Home.jsx";


function App() {

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/tasks" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
    </div>
  )
}

export default App
