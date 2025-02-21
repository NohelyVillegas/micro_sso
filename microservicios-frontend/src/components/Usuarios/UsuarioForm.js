import React, { useState } from 'react';
import axios from 'axios';

const UsuarioForm = ({ onSave }) => {
  const [form, setForm] = useState({ nombre: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8003/api/usuarios', form);
    onSave(response.data);
    setForm({ nombre: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="form-group mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-purple">Guardar</button>
    </form>
  );
};

export default UsuarioForm;
