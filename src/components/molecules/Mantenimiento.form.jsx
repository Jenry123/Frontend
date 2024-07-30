import React, { useState } from 'react';
import '../../styles/RendersFormProduction.scss';
import { useNavigate } from 'react-router-dom';
import authServices from '../../auth/authServices'; 

const MantenimientoForm = () => {
    const [tipo, setTipo] = useState('correctivo');
    const [fecha, setFecha] = useState('');
    const [costo, setCosto] = useState('');
    const [estadoPago, setEstadoPago] = useState('pendiente');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = authServices.getCurrentUser(); 
            const response = await fetch('http://localhost:3000/api/mantenimiento/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    id_maquinaria: 1,
                    tipo_mantenimiento: tipo, // Asegúrate de usar 'tipo_mantenimiento'
                    fecha,
                    costo,
                    estado_pago: estadoPago,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar el mantenimiento');
            }

            alert('Registro de mantenimiento agregado con éxito');
            setTipo('correctivo');
            setFecha('');
            setCosto('');
            setEstadoPago('pendiente');
            navigate('allregisters');
        } catch (error) {
            console.error('Error al registrar el mantenimiento', error);
        }
    };

    return (
        <div className='form-container-render'>
            <form onSubmit={handleSubmit} className="p-4">
                <h3>Registrar Mantenimiento</h3>
                <div className='container-form-center'>
                    <div className="mb-3">
                        <label className="form-label">Tipo de Mantenimiento</label>
                        <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="correctivo">Correctivo</option>
                            <option value="preventivo">Preventivo</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Costo</label>
                        <input type="number" step="0.01" className="form-control" value={costo} onChange={(e) => setCosto(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado de Pago</label>
                        <select className="form-select" value={estadoPago} onChange={(e) => setEstadoPago(e.target.value)} required>
                            <option value="pendiente">Pendiente</option>
                            <option value="pagado">Pagado</option>
                        </select>
                    </div>
                    <button type="submit" className="button">Registrar Mantenimiento</button>
                </div>
            </form>
        </div>
    );
};

export default MantenimientoForm;
