import axios from "axios";

const API_URL = "http://localhost:8003/api/usuarios";

// Función para obtener el token desde localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.credential; // Aquí guardamos el token de Google
};

// Configurar instancia de Axios con autenticación
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
API.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUsuarios = () => API.get("/");
export const getUsuarioById = (id) => API.get(`/${id}`);
export const createUsuario = (usuario) => API.post("/", usuario);
export const updateUsuario = (id, usuario) => API.put(`/${id}`, usuario);
export const deleteUsuario = (id) => API.delete(`/${id}`);
