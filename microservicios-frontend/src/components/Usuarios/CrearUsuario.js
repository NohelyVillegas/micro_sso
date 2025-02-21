import React, { useState } from 'react';
import { createUsuario } from '../../services/usuarioService';
import { useNavigate } from 'react-router-dom';

const CrearUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    creadoEn: '', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuarioConFecha = {
        ...usuario,
        fechaNacimiento: new Date(usuario.fechaNacimiento),
        creadoEn: new Date(),
      };
      await createUsuario(usuarioConFecha);
      alert('Usuario creado exitosamente');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Hubo un error al crear el usuario. Por favor, inténtelo nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fechaNacimiento"
            value={usuario.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-purple">Crear</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
