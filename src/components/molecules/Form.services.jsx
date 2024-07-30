import { useState } from "react";
import '../../styles/Services.scss';

const ServiceForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [providerName, setProviderName] = useState("");
  const [contact, setContact] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // falta la lógica para manejar el envío
    alert('Formulario enviado');
  };

  return (
    <div className="service-form-container">


      <div className="">

          <div className="container-supliers">
            <h2>Asignar Proveedor</h2>
            <div className="form-group">
              <label>Servicio</label>
              <select className="select">
                <option value="luz">Luz</option>
                <option value="agua">Agua</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>
          </div>
                <div className="container-supliers">
                <h3>Datos del Proveedor</h3>
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" value={providerName} onChange={(e) => setProviderName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Contacto</label>
                    <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="number" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <button type="submit" className="submit-button">Enviar</button>
                </form>
                </div>
        </div>

    </div>
  );
};

export default ServiceForm;
