import React, { useState, useEffect } from 'react';
import '../../styles/calculator.scss';

const Calculator = () => {
    const [peso, setPeso] = useState('');
    const [kilo, setKilo] = useState(1);
    const [gramos, setGramos] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    // Manejar cambio en el input de peso
    const handlePesoChange = (e) => {
        const pesoValue = parseFloat(e.target.value);
        setPeso(e.target.value);

        if (!isNaN(pesoValue)) {
            // Convertir pesos a gramos
            const kilos = pesoValue / 20;
            const gramosEquivalentes = kilos * 1000;
            setGramos(gramosEquivalentes.toFixed(2));
        } else {
            setGramos(0);
        }
    };

    const handleKiloChange = (e) => {
        const kiloValue = parseInt(e.target.value, 10);
        setKilo(kiloValue);

        setPeso((kiloValue * 20).toFixed(2));
        setGramos((kiloValue * 1000).toFixed(2));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setMensaje('Usuario no autenticado');
            return;
        }

        const token = user.token;
        const fecha = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
        const nuevaVenta = {
            fecha: fecha,
            id_usuario: user.id, 
            total: peso,
        };

        try {
            const response = await fetch('http://localhost:3000/api/ventas/agregarVenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(nuevaVenta),
            });

            if (response.ok) {
                setMensaje('Nueva venta agregada correctamente');
            } else {
                setMensaje('Error al agregar una nueva venta');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensaje('Error en la solicitud');
        }
    };

    return (
        <div className="calculator">
            <h1>Calculadora Peso-Kilo</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-container-calculator'>
                    <div>
                        <div className="input-field">
                            <p>En pesos</p>
                            <label>Precio (MXN)</label>
                            <input
                                type="number"
                                value={peso}
                                onChange={handlePesoChange}
                                placeholder="Ingresa el valor en pesos"
                            />
                        </div>
                        <div className="input-field">
                            <p>En kilos</p>
                            <label>Kilos</label>
                            <select value={kilo} onChange={handleKiloChange}>
                                {[...Array(10).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="input-field">
                            <p>Total</p>
                            <label>Equivalente en gramos</label>
                            <input
                                type="number"
                                value={gramos}
                                readOnly // Solo lectura
                                placeholder="Equivalente en gramos"
                            />
                        </div>

                        <button type="submit" className="add-button">
                            Agregar
                        </button>
                    </div>
                </div>
                {mensaje && <p>{mensaje}</p>}
            </form>
        </div>
    );
};

export default Calculator;
