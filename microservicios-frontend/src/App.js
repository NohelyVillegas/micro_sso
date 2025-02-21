import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import ListarUsuarios from "./components/Usuarios/ListarUsuarios";

const CLIENT_ID = "1068335107188-3sts9q2ia69jma29kg0fgnb81gduq9mg.apps.googleusercontent.com";

const App = () => {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/usuarios" /> : <Login setUser={setUser} />} />
          <Route path="/usuarios" element={user ? <ListarUsuarios /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
