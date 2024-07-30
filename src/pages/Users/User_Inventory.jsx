import React, { useState, useEffect } from 'react';
import DataTable from '../../components/atoms/Table';

const User_Inventory = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.tu-dominio.com/productos'); // Usa Aqui el endpoint
      const data = await response.json();
      setRows(data.map((producto, index) => ({  //debe coincidir con la api 
        id: index + 1,
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: 'id_producto', headerName: 'ID Producto', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'categoria', headerName: 'Categoría', width: 150 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'actions', headerName: 'Acciones', width: 150 },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
    // Ejemplo de cómo podrías actualizar los datos en la API:
    // await fetch(`https://api.tu-dominio.com/productos/${id}`, { method: 'PUT', body: JSON.stringify(datosActualizados) });
  };

  const handleDelete = async (id) => {
    console.log('Delete item with id:', id);
    try {
      await fetch(`https://api.tu-dominio.com/productos/${id}`, { method: 'DELETE' });
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className='content-section-page-user'>
      <h3>Inventario</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <DataTable 
          columns={columns} 
          rows={rows} 
          pageSize={5} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default User_Inventory;
