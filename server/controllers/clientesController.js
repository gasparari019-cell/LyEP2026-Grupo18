const db = require('../config/firebase');

const coleccion = db.collection('clientes');

// Arma el objeto con el id del documento, que es lo que espera el frontend.
const formatear = (doc) => ({ id: doc.id, ...doc.data() });

// Devuelve todos los clientes de la colección.
const listarClientes = async (req, res) => {
  try {
    const snapshot = await coleccion.get();
    res.json(snapshot.docs.map(formatear));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los clientes' });
  }
};

// Devuelve un cliente por su id.
const obtenerCliente = async (req, res) => {
  try {
    const doc = await coleccion.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(formatear(doc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el cliente' });
  }
};

// Crea un cliente nuevo y lo devuelve con su id.
const crearCliente = async (req, res) => {
  try {
    const { id, ...datos } = req.body;
    if (Object.keys(datos).length === 0) {
      return res.status(400).json({ mensaje: 'Faltan los datos del cliente' });
    }
    const ref = await coleccion.add(datos);
    const doc = await ref.get();
    res.status(201).json(formatear(doc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el cliente' });
  }
};

// Actualiza los campos enviados de un cliente existente.
const actualizarCliente = async (req, res) => {
  try {
    const ref = coleccion.doc(req.params.id);
    const existente = await ref.get();
    if (!existente.exists) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    const { id, ...datos } = req.body;
    await ref.set(datos, { merge: true });
    const actualizado = await ref.get();
    res.json(formatear(actualizado));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
  }
};

// Elimina un cliente y confirma el id borrado.
const eliminarCliente = async (req, res) => {
  try {
    const ref = coleccion.doc(req.params.id);
    const existente = await ref.get();
    if (!existente.exists) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    await ref.delete();
    res.json({ mensaje: 'Cliente eliminado', id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
  }
};

module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};