import '../../src/styles/Login.scss';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authServices from "./authServices";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {   
            const data = await authServices.login(email, pass);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id_rol', data.id_rol);
           
                console.log(data.id_rol);                      
                if (data.id_rol === 1) {
                    onLogin('admin');
                    navigate('/admin/');
                } else if (data.id_rol === 2) {
                    onLogin('user');
                    navigate('/user/');
                } 
            } else {                                  
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error al iniciar sesión:', error.response.data.message);
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                alert('Error: No se recibió respuesta del servidor');
            } else {
                console.error('Error en la solicitud:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    }

 

    return (
        <div className="login-container">
            <div className="logo-view"></div>
            <form onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
