// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/molecules/Header";
import Menu from "../../components/organism/HorizontalSlides";
import WelcomeModal from "./Bienvenida";

const AdminDashboard = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleCloseWelcomeModal = () => setShowWelcomeModal(false);

  const buttons = [
    { label: 'Inicio', path: 'home' }, // Nuevo botón para Home
    { label: 'Producción', path: 'produccion' },
    { label: 'Inventario', path: 'inventario' },
    { label: 'Empleados', path: 'empleados' },
    { label: 'Servicios', path: 'servicios' },
    { label: 'Reportes', path: 'reportes' }
  ];

  return (
    <>
      <Header>
        <Menu buttons={buttons}></Menu>
      </Header>

      <WelcomeModal show={showWelcomeModal} handleClose={handleCloseWelcomeModal} />
  
      <div className="main-content">
        <Outlet /> {/* Renderiza el contenido de las rutas hijas aquí */}
      </div>
    </>
  );
}

export default AdminDashboard;
