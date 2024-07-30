import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authServices from '../../auth/authServices';

const RegistroForm = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoId, setEmpleadoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const user = authServices.getCurrentUser(); // Obtén el usuario actual que contiene el token
        if (!user || !user.token) {
          throw new Error('Usuario no autenticado');
        }
        const response = await axios.get('http://localhost:3000/api/usuarios/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setEmpleados(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener empleados', error);
        setError('Error al obtener empleados');
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = authServices.getCurrentUser(); // Obtén el usuario actual que contiene el token
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const id_usuario = parseInt(empleadoId, 10); // Asegúrate de que el ID del usuario es un número entero

      if (isNaN(id_usuario)) {
        throw new Error('ID de usuario inválido');
      }

      await axios.post('http://localhost:3000/api/diasLaborados/', {
        id_usuario,
        fecha,
        horasTrabajadas: horasTrabajadas
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      alert('Día laborado registrado con éxito');
      setEmpleadoId('');
      setFecha('');
      setHorasTrabajadas('');
    } catch (error) {
      console.error('Error al registrar el día laborado', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Cargando empleados...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="form-label">Empleado</label>
            <select
              className="form-control"
              value={empleadoId}
              onChange={(e) => {
                console.log(e.target.value); // Verifica el valor seleccionado
                setEmpleadoId(e.target.value);
              }}
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado.id_Usuario} value={empleado.id_Usuario}>
                  {empleado.id_usuario}{')  '}
                  {empleado.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Horas Trabajadas</label>
            <input
              type="number"
              className="form-control"
              value={horasTrabajadas}
              onChange={(e) => setHorasTrabajadas(e.target.value)}
              required
            />
          </div>
          <button type="submit" >
            Registrar Día Laborado
          </button>
        </>
      )}
    </form>
  );
};

export default RegistroForm;
