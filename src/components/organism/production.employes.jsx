import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table'; 
import '../../styles/dataTable.scss';
import ConfirmDeleteModal from '../molecules/modal';
import authServices from '../../auth/authServices';

const Production = () => {
  const [materiaPrimaRows, setMateriaPrimaRows] = useState([]);
  const [mantenimientoRows, setMantenimientoRows] = useState([]);
  const [loadingMateriaPrima, setLoadingMateriaPrima] = useState(true);
  const [loadingMantenimiento, setLoadingMantenimiento] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  const fetchMateriaPrima = async () => {
    try {
      const user = authServices.getCurrentUser();
      const response = await fetch('http://localhost:3000/api/materiaPrima/', {
        headers: {
          'Authorization': `Bearer ${user.token}` // Agrega el token en el encabezado
        }
      });
      const data = await response.json();
      // Asigna un id único a cada fila
      const rowsWithId = data.map((item, index) => ({ ...item, id: index + 1 }));
      setMateriaPrimaRows(rowsWithId);
      setLoadingMateriaPrima(false);
    } catch (error) {
      console.error('Error fetching materia prima data:', error);
      setLoadingMateriaPrima(false);
    }
  };

  const fetchMantenimiento = async () => {
    try {
      const user = authServices.getCurrentUser();
      const response = await fetch('http://localhost:3000/api/mantenimiento/', {
        headers: {
          'Authorization': `Bearer ${user.token}` // Agrega el token en el encabezado
        }
      });
      const data = await response.json();
      // Asigna un id único a cada fila
      const rowsWithId = data.map((item, index) => ({ ...item, id: index + 1 }));
      setMantenimientoRows(rowsWithId);
      setLoadingMantenimiento(false);
    } catch (error) {
      console.error('Error fetching mantenimiento data:', error);
      setLoadingMantenimiento(false);
    }
  };

  useEffect(() => {
    fetchMateriaPrima();
    fetchMantenimiento();
  }, []);

  const materiaPrimaColumns = [
    { field: 'id_materia_prima', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'unidades', headerName: 'Unidades', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Editar</button>
          <button onClick={() => handleDelete('materiaPrima', params.row.id)}>Eliminar</button>
        </div>
      ),
    },
  ];

  const mantenimientoColumns = [
    { field: 'id_mantenimiento', headerName: 'ID', width: 90 },
    { field: 'tipo_mantenimiento', headerName: 'Tipo de Mantenimiento', width: 200 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'costo', headerName: 'costo', width: 150 },
    { field: 'estado_pago', headerName: 'Estado', width: 130 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Editar</button>
          <button onClick={() => handleDelete('mantenimiento', params.row.id)}>Eliminar</button>
        </div>
      ),
    },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
  };

  const handleDelete = async (type, id) => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`https://api.tu-dominio.com/${deleteType}/${deleteId}`, { method: 'DELETE' });
      if (deleteType === 'materiaPrima') {
        setMateriaPrimaRows(materiaPrimaRows.filter((row) => row.id !== deleteId));
      } else if (deleteType === 'mantenimiento') {
        setMantenimientoRows(mantenimientoRows.filter((row) => row.id !== deleteId));
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting data:', error);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className='data-table-contain'>
      <div>
        <p>Materia Prima</p>
        {loadingMateriaPrima ? (
          <p>Cargando materia prima...</p>
        ) : (
          <DataTable
            columns={materiaPrimaColumns}
            rows={materiaPrimaRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete('materiaPrima', id)}
          />
        )}
      </div>

      <div>
        <p>Mantenimiento</p>
        {loadingMantenimiento ? (
          <p>Cargando mantenimiento...</p>
        ) : (
          <DataTable
            columns={mantenimientoColumns}
            rows={mantenimientoRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={(id) => handleDelete('mantenimiento', id)}
          />
        )}
      </div>

      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Production;
