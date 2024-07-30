const API_URL = 'http://localhost:3000/api/usuarios/';

const login = async (email, pass) => {
  const response = await fetch(`${API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pass }),
  });

  if (!response.ok) {
    throw new Error('Error en la solicitud de inicio de sesión');
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  
  
  return data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};

export default {
  login,
  logout,
  getCurrentUser,
  authHeader
};
