import React, { useState } from 'react';
import '../../styles/Inventory.scss';

const CostalesHarinaForm = () => {
    const [cantidad, setCantidad] = useState(0);
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : "";

        const nuevaMateriaPrima = {
            id_materia_prima:1,
            cantidad,
        };

        try {
            const response = await fetch('http://localhost:3000/api/costales/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaMateriaPrima),
            });

            if (response.ok) {
                setMensaje("Nuevo costal de harina agregado correctamente");
            } else {
                setMensaje("Error al agregar un nuevo costal de harina");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensaje("Error en la solicitud");
        }
    };

    return (
        <div>
            <div className="form-title">
                <h2>Costales de Harina</h2>
            </div>
            <div className="container-render-form">
                <form onSubmit={handleSubmit}>
    
                    <div className="form-group">
                        <label>Cantidad de Costales</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Agregar Costal</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default CostalesHarinaForm;

