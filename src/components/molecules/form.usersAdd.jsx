import React, { useState } from 'react';
import '../../styles/usuarios.scss';

const FormularioAddUSers = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellidos: '',
    estado_civil: '',
    edad: '',
    sexo: '',
    correo: '',
    contrasena: '',
    telefono: '',
    id_rol: '2', // Establece el rol automáticamente en 2
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token desde localStorage o cualquier otro almacenamiento
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/agregarUsuario', { // Asegúrate de que esta URL sea la correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formValues.nombre,
          apellidos: formValues.apellidos,
          estado_civil: formValues.estado_civil,
          edad: formValues.edad,
          sexo: formValues.sexo,
          email: formValues.correo,
          pass: formValues.contrasena,
          telefono: formValues.telefono,
          id_rol: formValues.id_rol,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result); // Muestra el mensaje de éxito o realiza otra acción
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (err) {
      console.error('Error al agregar usuario:', err);
      alert('Error al agregar usuario');
    }
  };

  return (
    <div className="form-container">
      <h2>Información de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formValues.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado_civil">Estado Civil</label>
          <input
            type="text"
            id="estado_civil"
            name="estado_civil"
            value={formValues.estado_civil}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formValues.edad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            name="sexo"
            value={formValues.sexo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formValues.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formValues.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formValues.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className='contain-button-user'>
          <button type="submit" className='button'>Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioAddUSers;
