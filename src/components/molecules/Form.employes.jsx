import { useState } from "react";
import {useNavigate} from "react-router-dom"
import '../../styles/employes.scss';
import authServices from '../../auth/authServices'; // Asegúrate de tener un servicio de autenticación para obtener el token

const FormularioEmployes = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [sueldoSemanal, setSueldoSemanal] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = {
            nombre,
            apellidos,
            estado_civil: estadoCivil,
            edad: parseInt(edad),
            sexo,
            email,
            pass: password,
            telefono: telefono.toString(), // Asegurarse de que sea una cadena
            fecha_ingreso: fechaIngreso,
            sueldo_semanal: parseInt(sueldoSemanal),
            id_rol: 2, // Asignar automáticamente el valor 2 a id_rol
        };

        try {
            const user = authServices.getCurrentUser(); // Obtener el usuario actual que contiene el token
            if (!user || !user.token) {
                throw new Error('Usuario no autenticado');
            }

            const response = await fetch('http://localhost:3000/api/usuarios/agregarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                alert('Empleado agregado correctamente');
                // Opcional: resetear los campos del formulario
                setNombre('');
                setApellidos('');
                setEstadoCivil('');
                setEdad('');
                setSexo('');
                setEmail('');
                setTelefono('');
                setFechaIngreso('');
                setSueldoSemanal('');
                setPassword('');

                navigate('employesAdded');
            } else {
                // Intentar obtener el mensaje de error como JSON
                let errorData;
                try {
                    errorData = await response.json();
                } catch (error) {
                    errorData = { error: 'Error desconocido' };
                }
                alert(`Error al agregar el empleado: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con la API');
        }
    };

    return (
        <div className="container-form-employes">
            <p> Datos básicos</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group-employes">
                    <label>Nombre Completo</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Apellidos</label>
                    <br></br>
                    <input 
                        type="text" 
                        value={apellidos} 
                        onChange={(e) => setApellidos(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Estado Civil</label>
                    <select 
                        value={estadoCivil} 
                        onChange={(e) => setEstadoCivil(e.target.value)} 
                        required
                    >
                        <option value="">Seleccione un estado civil</option>
                        <option value="soltero">Soltero</option>
                        <option value="casado">Casado</option>
                        <option value="divorciado">Divorciado</option>
                        <option value="viudo">Viudo</option>
                    </select>
                </div>
                <div className="form-group-employes">
                    <label>Edad</label>
                    <br></br>
                    <input 
                        type="number" 
                        value={edad} 
                        onChange={(e) => setEdad(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Sexo</label>
                    <select 
                        value={sexo} 
                        onChange={(e) => setSexo(e.target.value)} 
                        required
                    >
                        <option value="">Seleccione un sexo</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div className="content-section-form">
                    <div className="form-group-employes">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group-employes">
                        <label>Teléfono</label>
                        <br></br>
                        <input 
                            type="tel" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                            required 
                        />
                    </div>
                </div>
                <div className="form-group-employes">
                    <label>Fecha de Ingreso</label>
                    <input 
                        type="date" 
                        value={fechaIngreso} 
                        onChange={(e) => setFechaIngreso(e.target.value)} 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Salario</label><br/>
                    <input 
                        type="text" 
                        value={sueldoSemanal} 
                        onChange={(e) => setSueldoSemanal(e.target.value)} 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Contraseña</label><br/>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="contain-button">
                    <button type="submit" className="button">Agregar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioEmployes;
