import React, { useEffect, useState } from 'react';
import { getUsuarioById, updateUsuario } from '../../services/usuarioService';
import { useNavigate, useParams } from 'react-router-dom';

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    fechaNacimiento: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      const { data } = await getUsuarioById(id);
      setUsuario(data);
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUsuario(id, usuario);
    navigate('/usuarios');
  };

  const handleGoBack = () => {
    navigate('/usuarios');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Editar Usuario</h2>
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
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-purple">
            Actualizar
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario;
