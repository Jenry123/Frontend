import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';
import authServices from '../../auth/authServices';
import ConfirmDeleteModal from '../molecules/modal';

const UsersAdded = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:3000/api/usuarios', {
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
      setUsers(data.map((item) => ({
        id: item.id_Usuario,  // Usa el id del usuario como identificador único
        nombre: item.nombre,
        apellidos: item.apellidos,
        estado_civil: item.estado_civil,
        edad: item.edad,
        sexo: item.sexo,
        email: item.email,
        telefono: item.telefono,
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'estado_civil', headerName: 'Estado Civil', width: 130 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'email', headerName: 'Correo Electrónico', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Editar</button>
          <button onClick={() => handleDeleteClick(params.row.id)}>Eliminar</button>
        </div>
      )
    },
  ];

  const handleEdit = (id) => {
    alert(`Editar usuario con ID: ${id}`);
    // Implementar lógica para editar el usuario
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/usuarios/${deleteId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== deleteId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="content-section-page-article">
      <div className="content-item1">
        <p>Usuarios Agregados</p>
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <DataTable 
            columns={columns} 
            rows={users} 
            pageSize={5}
          />
        )}
      </div>
      <ConfirmDeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
      />
    </div>
  );
};

export default UsersAdded;
