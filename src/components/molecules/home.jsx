// src/pages/HomePage.js
import React from 'react';
// Asegúrate de tener una imagen adecuada en la carpeta de assets
import '../../styles/home.scss'
import tortillaImage from '../../assets/tortilla.jpeg'
const HomePage = () => {
  return (
    <div className="homepage">
      <div className="welcome-section">
        <img src={tortillaImage} alt="Tortilla" className="tortilla-image" />
        <h1>Bienvenido a la Tortillería</h1>
        <p>
          Disfruta de las mejores tortillas frescas hechas con ingredientes de calidad.
        </p>
        <p>
          Explora nuestro sistema para gestionar la producción, inventario, empleados, usuarios, servicios y reportes.
        </p>
      </div>
      <div className="home-features">
        <div className="feature">
          <h2>Producción</h2>
          <p>Gestiona la producción de tortillas y asegura la calidad en cada lote.</p>
        </div>
        <div className="feature">
          <h2>Inventario</h2>
          <p>Controla el inventario de materias primas y productos terminados.</p>
        </div>
        <div className="feature">
          <h2>Empleados</h2>
          <p>Administra la información y horarios de tus empleados.</p>
        </div>
        <div className="feature">
          <h2>Servicios</h2>
          <p>Controla los servicios de mantenimiento y otros servicios necesarios.</p>
        </div>
        <div className="feature">
          <h2>Reportes</h2>
          <p>Genera reportes detallados para tomar decisiones informadas.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
