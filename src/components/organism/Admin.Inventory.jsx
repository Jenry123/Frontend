import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';
import authServices from '../../auth/authServices';
import ConfirmDeleteModal from '../molecules/modal';

const AdminDataInventory = () => {
  const [maquinariaRows, setMaquinariaRows] = useState([
    { id: 1, id_maquinaria: 'M001', nombre: 'Maquina A', descripcion: 'Descripción A', cantidad: 10 },
    { id: 2, id_maquinaria: 'M002', nombre: 'Maquina B', descripcion: 'Descripción B', cantidad: 5 }
  ]);

  const [materiaPrimaRows, setMateriaPrimaRows] = useState([
    { id: 1, id_materia_prima: 'MP001', nombre: 'Materia Prima A', descripcion: 'Descripción A', cantidad: 100, unidad: 'kg' },
    { id: 2, id_materia_prima: 'MP002', nombre: 'Materia Prima B', descripcion: 'Descripción B', cantidad: 50, unidad: 'kg' }
  ]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMaquinaria = async () => { 
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:3000/api/maquinaria/verMaquinar', {
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
      setMaquinariaRows(data.map((item, index) => ({
        id: index + 1,
        id_maquinaria: item.id_maquinaria,
        nombre: item.nombre,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
      })));
    } catch (error) {
      console.error('Error fetching maquinaria data:', error);
    }
  };

  const fetchMateriaPrima = async () => {
    try {
      const user = authServices.getCurrentUser();
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:3000/api/materiaPrima/', {
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
      setMateriaPrimaRows(data.map((item, index) => ({
        id: index + 1,
        id_materia_prima: item.id_materia_prima,
        nombre: item.nombre,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        unidad: item.unidad,
      })));
    } catch (error) {
      console.error('Error fetching materia prima data:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMaquinaria(), fetchMateriaPrima()])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const maquinariaColumns = [
    { field: 'id_maquinaria', headerName: 'ID Maquinaria', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'actions', headerName: 'Acciones', width: 150 },
  ];

  const materiaPrimaColumns = [
    { field: 'id_materia_prima', headerName: 'ID Materia Prima', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'unidad', headerName: 'Unidad', width: 150 },
    { field: 'actions', headerName: 'Acciones', width: 150 },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
    // Ejemplo de cómo podrías actualizar los datos en la API:
    // await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'PUT', body: JSON.stringify(datosActualizados) });
  };

  const handleDelete = (id, type) => {
    setDeleteId(id);
    setDeleteType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteId(null);
    setDeleteType(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId && deleteType) {
      try {
        await fetch(`http://localhost:3000/api/${deleteType}/${deleteId}`, { method: 'DELETE' });
        if (deleteType === 'maquinaria') {
          setMaquinariaRows(maquinariaRows.filter((row) => row.id !== deleteId));
        } else if (deleteType === 'materiaPrima') {
          setMateriaPrimaRows(materiaPrimaRows.filter((row) => row.id !== deleteId));
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      } finally {
        handleCloseModal();
      }
    }
  };

  return (
    <div className='content-section-page-user'>
      <h3 style={{ padding: '40px' }}>Inventario</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h4>Maquinaria</h4>
          <DataTable
            columns={maquinariaColumns}
            rows={maquinariaRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete(id, 'maquinaria')}
          />
          <h4>Materia Prima</h4>
          <DataTable
            columns={materiaPrimaColumns}
            rows={materiaPrimaRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete(id, 'materiaPrima')}
          />
        </>
      )}
      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminDataInventory;
