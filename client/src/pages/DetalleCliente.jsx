import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";

const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Antes: fetch directo a `https://fakestoreapi.com/users/${id}` (API de prueba).
    // Ahora se usa clientesService, que lee del backend propio (Firestore).
    clientesService
      .obtenerCliente(id)
      .then((data) => setCliente(data))
      .catch(() => setMensaje("No se pudo cargar el cliente."));
  }, [id]);

    const eliminarCliente = async () => {
    try {
      // Antes: fetch directo con method DELETE a fakestoreapi. Ahora se usa
      // clientesService, que borra en el backend propio (Firestore).
      await clientesService.eliminarCliente(id);

      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch (error) { //Mostramos mensaje de error si falla la eliminación del cliente (ver analisis numero [5] en Analisis.md)
      setMensaje("No se pudo eliminar el cliente. Intente nuevamente.");
    }
  };
  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>
      {/* No se muestra la contraseña del cliente por motivos de seguridad (ver ANALISIS.md, hallazgo #2) */}
      <h2>Datos de acceso</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar'onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;