import React from 'react';
import frontImage from './front.png'; 

const Home = () => (
  <div className="text-center mt-5">
    <h1 className="mb-4 text-primary">APLICACIÓN DE MICRO-SERVICIOS</h1>
    <div className="d-flex justify-content-center">
      <img
        src={frontImage} 
        alt="Bienvenida"
        className="img-fluid rounded shadow"
        style={{ maxWidth: '35%' }}
      />
    </div>
  </div>
);

export default Home;
