import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tortilla from '../../assets/tortilla.png'

const WelcomeModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bienvenido a Nuestra Aplicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h4>¡Nos alegra tenerte aquí!</h4>
          <p>
            Nuestra aplicación está diseñada para ofrecerte la mejor experiencia en la gestión de tus servicios y pagos.
          </p>
          <img src={tortilla}   width={80} height={80} alt="Welcome" className="img-fluid my-3" />
          <p>
            Si necesitas ayuda, no dudes en contactarnos.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleClose}>
          Empezar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
