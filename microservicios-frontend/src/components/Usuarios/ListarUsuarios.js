import React, { useEffect, useState } from 'react';
import { getUsuarios, deleteUsuario } from '../../services/usuarioService';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const { data } = await getUsuarios();
    setUsuarios(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      await deleteUsuario(id);
      fetchUsuarios();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Usuarios</h2>
        <Link to="/usuarios/crear" className="btn btn-purple">
          <FaPlus className="me-2" />
          Crear Usuario
        </Link>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.fechaNacimiento}</td>
              <td>
                <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-warning btn-sm me-2">
                  <FaEdit className="me-1" />
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(usuario.id)}
                >
                  <FaTrash className="me-1" />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
