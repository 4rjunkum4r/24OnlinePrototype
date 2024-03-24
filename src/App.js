import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Dashboard from "../src/Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import FirebaseCRUD from "./components/firebase/firebaseCRUD/crud";
import StudentLogs from "./components/firebase/firebaseCRUD/studentLog";

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/crud" element={<FirebaseCRUD/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logs" element={<StudentLogs/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
