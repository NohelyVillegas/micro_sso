import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log("Login Exitoso:", credentialResponse);

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(credentialResponse));

    // Actualizar estado global
    setUser(credentialResponse);

    // Redirigir a la lista de usuarios
    navigate("/usuarios");
  };

  const handleFailure = () => {
    console.log("Error en Login");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Iniciar Sesión</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default Login;
