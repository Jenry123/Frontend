import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Services.scss'; // Asegúrate de importar tu archivo CSS
import DataTable from '../atoms/Table';
import ConfirmDeleteModal from '../molecules/modal'; // Asegúrate de la ruta correcta de este archivo

const SectionServicesAdded = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [servicesRows, setServicesRows] = useState([]);
  const [paymentRows, setPaymentRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : "";

      const response = await fetch('http://localhost:3000/api/servicios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setServicesRows(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (id) => {
    alert(`Editar ${deleteType} con ID: ${id}`);
    // Implementar lógica para editar
  };

  const handleDelete = (type, id) => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : "";

      await fetch(`http://localhost:3000/api/servicios/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (deleteType === 'service') {
        setServicesRows(servicesRows.filter(row => row.id !== deleteId));
      } else if (deleteType === 'payment') {
        setPaymentRows(paymentRows.filter(row => row.id !== deleteId));
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : "";

    const newService = {
      id_servicio: Date.now(), // Asigna un ID temporal; se puede ajustar según el backend
      nombre,
      descripcion,
    };

    try {
      const response = await fetch('http://localhost:3000/api/servicios/agregarServicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newService)
      });

      if (response.ok) {
        const addedService = await response.json();
        setServicesRows([...servicesRows, addedService]);
        setShowModal(false);
        setMensaje("Nuevo servicio agregado correctamente");
      } else {
        setMensaje("Error al agregar un nuevo servicio");
      }
    } catch (error) {
      console.error('Error adding service:', error);
      setMensaje("Error en la solicitud");
    }
  };

  const servicesColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'provedor', headerName: 'Proveedor', width: 110 },
    { field: 'contacto', headerName: 'Contacto', width: 160 },
    {
      field: 'actions', headerName: 'Acciones', width: 150, renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Editar</button>
          <button onClick={() => handleDelete('service', params.row.id)}>Eliminar</button>
        </div>
      )
    },
  ];

  const paymentColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'serviceName', headerName: 'Nombre del Servicio', width: 150 },
    { field: 'cost', headerName: 'Costo', width: 110 },
    { field: 'status', headerName: 'Estado', width: 160 },
    {
      field: 'actions', headerName: 'Acciones', width: 150, renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Editar</button>
          <button onClick={() => handleDelete('payment', params.row.id)}>Eliminar</button>
        </div>
      )
    },
  ];

  return (
    <div className="content-section-page-user">
      <button className="custom-button" onClick={() => setShowModal(true)}>
        Registrar Servicio
      </button>

      <div className="content-item">
        <p>Servicios Agregados</p>
        <DataTable
          columns={servicesColumns}
          rows={servicesRows}
        />
      </div>

      <div className="content-item">
        <p>Pagos realizados</p>
        <DataTable
          columns={paymentColumns}
          rows={paymentRows}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
            </div>
            <button className="custom-button" type="submit">
              Enviar
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {mensaje && <p>{mensaje}</p>}

      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SectionServicesAdded;
