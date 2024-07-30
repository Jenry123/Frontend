import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';
import ConfirmDeleteModal from '../molecules/modal';
import authServices from '../../auth/authServices';

const EmployesTables = () => {
  const [employeeRows, setEmployeeRows] = useState([]);
  const [workDaysRows, setWorkDaysRows] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingWorkDays, setLoadingWorkDays] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, type: '' });

  const fetchEmployees = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:3000/api/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setEmployeeRows(data.map((item, index) => ({
        id: index + 1,
        id_Usuario: item.id_Usuario,
        nombre: item.nombre,
        apellidos: item.apellidos,
        estado_civil: item.estado_civil,
        edad: item.edad,
        sexo: item.sexo,
        email: item.email,
        pass: item.pass,
        telefono: item.telefono,
        id_rol: item.id_rol,
        fecha_ingreso: item.fecha_ingreso,
        sueldo_semanal: item.sueldo_semanal,
        ultimo_login: item.ultimo_login
      })));
      setLoadingEmployees(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setLoadingEmployees(false);
    }
  };

  const fetchWorkDays = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:3000/api/diasLaborados/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setWorkDaysRows(data.map((item, index) => ({
        id: index + 1,
        id_Usuario: item.id_usuario,
        nombre: item.nombre,
        apellidos: item.apellidos,
        fecha: item.fecha,
        horasTrabajadas: item.horasTrabajadas,
      })));
      setLoadingWorkDays(false);
    } catch (error) {
      console.error('Error fetching work days data:', error);
      setLoadingWorkDays(false);
    }
  };

  useEffect(() => {
    setLoadingEmployees(true);
    setLoadingWorkDays(true);
    Promise.all([fetchEmployees(), fetchWorkDays()])
      .then(() => {
        setLoadingEmployees(false);
        setLoadingWorkDays(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoadingEmployees(false);
        setLoadingWorkDays(false);
      });
  }, []);

  const employeeColumns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'estado_civil', headerName: 'Estado Civil', width: 130 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'pass', headerName: 'Contraseña', width: 150 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'id_rol', headerName: 'Rol', width: 100 },
    { field: 'fecha_ingreso', headerName: 'Fecha de Ingreso', width: 150 },
    { field: 'sueldo_semanal', headerName: 'Sueldo Semanal', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleDelete(params.row.id_Usuario, 'empleado')}>Eliminar</button>
        </div>
      ),
    },
  ];

  const workDaysColumns = [
    { field: 'id_Usuario', headerName: 'ID Usuario', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'horasTrabajadas', headerName: 'Horas Trabajadas', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleDelete(params.row.id, 'diasLaborados')}>Eliminar</button>
        </div>
      ),
    },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
  };

  const handleDelete = (id, type) => {
    setDeleteItem({ id, type });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const { id, type } = deleteItem;
    try {
      await fetch(`http://localhost:3000/api/usuarios/${type}/${id}`, { method: 'DELETE' });
      if (type === 'empleado') {
        setEmployeeRows(employeeRows.filter((row) => row.id !== id));
      } else if (type === 'diasLaborados') {
        setWorkDaysRows(workDaysRows.filter((row) => row.id !== id));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
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
            onDelete={(id) => handleDelete(id, 'empleado')}
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
            onDelete={(id) => handleDelete(id, 'diasLaborados')}
          />
        )}
      </div>

      <ConfirmDeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmDelete}
      />
    </div>
  );
};

export default EmployesTables;
