import React, { useState } from 'react';
import MantenimientoForm from '../molecules/Mantenimiento.form';
import MateriaPrimaForm from '../molecules/MateriaPrima.form';

import '../../styles/RendersFormProduction.scss';
import Production from './production.employes';

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState('mantenimiento');

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'mantenimiento':
        return <MantenimientoForm />;
      case 'materia-prima':
        return <MateriaPrimaForm />;
      case 'ver-registros':
        return <Production />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <h1>Registro de Datos</h1>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${selectedForm === 'mantenimiento' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedForm('mantenimiento')}
          >
            Mantenimiento
          </button>
          <button
            type="button"
            className={`btn ${selectedForm === 'materia-prima' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedForm('materia-prima')}
          >
            Materia Prima
          </button>
          <button
            type="button"
            className={`btn ${selectedForm === 'ver-registros' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedForm('ver-registros')}
          >
            Ver Registros
          </button>
        </div>
      </div>
      <div className="form-container-result">
        {renderSelectedForm()}
      </div>
    </div>
  );
};

export default FormSelector;

