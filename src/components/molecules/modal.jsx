import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import img from './../../assets/cosecha-de-maiz.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import trash from './../../assets/basura.png';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };

  const paragraphStyle = {
    fontSize: '1.25rem', // Ajusta el tamaño de la fuente
    fontWeight: 'bold',  // Ajusta el peso de la fuente
    color: '#333',       // Ajusta el color del texto
    marginBottom: '1rem', // Ajusta el margen inferior
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div style={containerStyle}>
          <Modal.Title>
            <img src={img} width={100} height={80} alt="Logo" />
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="d-flex flex-column align-items-center">
          <p style={paragraphStyle}>Desea eliminar</p>
          <div className="bg-light rounded-circle p-4 mb-4">
            <img src={trash} width={120} height={120} alt="Trash Icon" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
