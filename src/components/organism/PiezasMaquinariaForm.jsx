import React, { useState } from 'react';
import '../../styles/Inventory.scss';

const PiezasMaquinariaForm = () => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : "";

        const nuevaMaquinaria = {
            nombre,
            descripcion,
            cantidad,
        };

        try {
            const response = await fetch('http://localhost:3000/api/piezasMaquinaria/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaMaquinaria),
            });

            if (response.ok) {
                setMensaje("Nueva maquinaria agregada correctamente");
                alert('agregado correctamente');
            } else {
                setMensaje("Error al agregar una nueva maquinaria");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMensaje("Error en la solicitud");
            alert(error);
        }
    };

    return (
        <div>
            <div className="form-title">
                <h2>Piezas de Maquinaria</h2>
            </div>
            <div className="container-render-form">
                <div id="contain-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre de la Pieza</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Cantidad</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Agregar Pieza</button>
                    </form>
                    {mensaje && <p>{mensaje}</p>}
                    
                </div>
            </div>
        </div>
    );
};

export default PiezasMaquinariaForm;
