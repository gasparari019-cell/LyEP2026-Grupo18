import axios from "axios";

// Antes: const URL = "https://fakestoreapi.com/users"; (API pública de prueba).
// Ahora apunta al backend propio (Parte 4 - Firestore). VITE_API_URL permite
// cambiar la dirección sin tocar código, por ejemplo al correr en un Codespace
// (ver guía del equipo, sección 7.3).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/clientes";

const listarClientes = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

const obtenerCliente = async (id) => {
  const respuesta = await axios.get(`${API_URL}/${id}`);
  return respuesta.data;
};

const crearCliente = async (cliente) => {
  const respuesta = await axios.post(API_URL, cliente);
  return respuesta.data;
};

const actualizarCliente = async (id, cliente) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, cliente);
  return respuesta.data;
};

const eliminarCliente = async (id) => {
  const respuesta = await axios.delete(`${API_URL}/${id}`);
  return respuesta.data;
};

export default {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};