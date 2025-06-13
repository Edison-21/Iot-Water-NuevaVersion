// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://tu-api.com/api/'; // Cambia esto a la URL de tu API

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Almacena el token
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token'); // Elimina el token
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Devuelve true si hay un token
};