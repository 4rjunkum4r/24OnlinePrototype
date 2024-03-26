import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import FirebaseCRUD from "./components/CRUD/firebaseCRUD";
import StudentLogs from "./components/CRUD/studentLog"

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/crud" element={<FirebaseCRUD/>}/>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logs" element={<StudentLogs/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
