import React, { useState, useEffect } from 'react';
import '../../styles/container-payload.scss'

const FormularioPago = ({ servicios }) => {
  const [selectedService, setSelectedService] = useState('');
  const [fecha, setFecha] = useState('');
  const [costo, setCosto] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (servicios && servicios.length > 0) {
      setOptions(servicios);
    }
  }, [servicios]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDateChange = (e) => {
    setFecha(e.target.value);
  };

  const handleCostChange = (e) => {
    setCosto(e.target.value);
  };

  return (
    <div className="container-form-payload">
      <div id='form'>
        <label>Elija un servicio</label>
        <select value={selectedService} onChange={handleServiceChange} className='select-services'>
          <option value="">Seleccione un servicio</option>
          {options.length > 0 ? (
            options.map((service, index) => (
              <option key={index} value={service.nombre}>
                {service.nombre}
              </option>
            ))
          ) : (
            <option disabled>No hay servicios disponibles</option>
          )}
        </select>

        <label>Fecha</label>
        <input value={fecha} onChange={handleDateChange} type="date" />

        <label>Costo</label>
        <input value={costo} onChange={handleCostChange} type="text" />

        <button>Agregar</button>
      </div>
    </div>
  );
};

export default FormularioPago;


