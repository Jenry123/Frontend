import React, { useState, useEffect } from 'react';
import DataTable from '../../components/atoms/Table';
import authServices from '../../auth/authServices';


const EmployesTables = () => {
  const [employeeRows, setEmployeeRows] = useState([]);
  const [workDaysRows, setWorkDaysRows] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingWorkDays, setLoadingWorkDays] = useState(true);
  const [authError, setAuthError] = useState('');

  // Function to fetch employee data
  const fetchEmployees = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:3000/api/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployeeRows(data);
      setLoadingEmployees(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setAuthError(error.message); // Display or handle the authentication error
      setLoadingEmployees(false);
    }
  };

  // Function to fetch work days data
  const fetchWorkDays = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('http://localhost:3000/api/dias-laborados/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch work days');
      }

      const data = await response.json();
      setWorkDaysRows(data);
      setLoadingWorkDays(false);
    } catch (error) {
      console.error('Error fetching work days data:', error);
      setAuthError(error.message); // Display or handle the authentication error
      setLoadingWorkDays(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchWorkDays();
  }, []);

  const employeeColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 150 },
    { field: 'estado_civil', headerName: 'Estado Civil', width: 150 },
    { field: 'edad', headerName: 'Edad', width: 90 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'pass', headerName: 'Contraseña', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'id_rol', headerName: 'ID Rol', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const workDaysColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombreEmpleado', headerName: 'Nombre del Empleado', width: 200 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'hora', headerName: 'Hora', width: 100 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Logic for editing
  };

  const handleDelete = async (id) => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('User not authenticated');
      }

      await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      // Filter rows
      setEmployeeRows(employeeRows.filter((row) => row.id !== id));
      setWorkDaysRows(workDaysRows.filter((row) => row.id !== id)); // Adjust if necessary
    } catch (error) {
      console.error('Error deleting data:', error);
      setAuthError(error.message); // Display or handle the authentication error
    }
  };

  return (
    <div>
      {authError && <p className="error">Error: {authError}</p>}
      <div>
        <p>Empleados Registrados</p>
        {loadingEmployees ? (
          <p>Cargando empleados...</p>
        ) : (
          <DataTable
            columns={employeeColumns}
            rows={employeeRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div>
        <p>Días Laborados</p>
        {loadingWorkDays ? (
          <p>Cargando días laborados...</p>
        ) : (
          <DataTable
            columns={workDaysColumns}
            rows={workDaysRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EmployesTables;
