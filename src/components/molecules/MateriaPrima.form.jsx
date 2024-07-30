import React, { useState } from 'react';
import '../../styles/RendersFormProduction.scss';
import authServices from '../../auth/authServices'; // Importa el servicio de autenticación

const MateriaPrimaForm = () => {
    const [nombre, setNombre] = useState('');
    const [unidades, setUnidades] = useState('kilogramos');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = authServices.getCurrentUser(); // Obtén el usuario actual con el token
            const response = await fetch('http://localhost:3000/api/materiaPrima/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Agrega el token en el encabezado de autorización
                },
                body: JSON.stringify({
                    nombre,
                    unidades,
                    descripcion
                })
            });

            if (!response.ok) {
                throw new Error('Error al registrar la materia prima');
            }

            alert('Registro de materia prima agregado con éxito');
            setNombre('');
            setUnidades('kilogramos');
            setDescripcion('');
        } catch (error) {
            console.error('Error al registrar la materia prima', error);
        }
    };

    return (
        <div className='form-container-render'>
            <form onSubmit={handleSubmit} className="p-4">
                <h3>Registrar Materia Prima</h3>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Unidades</label>
                    <select className="form-select" value={unidades} onChange={(e) => setUnidades(e.target.value)} required>
                        <option value="kilogramos">Kilogramos</option>
                        <option value="litros">Litros</option>
                        <option value="unidades">Unidades</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <button type="submit" className="button">Registrar Materia Prima</button>
            </form>
        </div>
    );
};

export default MateriaPrimaForm;
