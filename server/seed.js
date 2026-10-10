const db = require('./config/firebase');

// Datos de prueba con la misma forma que usaba el frontend con fakestoreapi.com/users:
// ListaClientes.jsx lee name, email, phone y address.city;
// DetalleCliente.jsx además lee username, address.street, address.number y address.zipcode.
// No se guarda contraseña porque el frontend no la muestra (ver ANALISIS.md, hallazgo #2).
const clientes = [
  {
    username: 'anaperez',
    name: { firstname: 'Ana', lastname: 'Pérez' },
    email: 'ana.perez@example.com',
    phone: '388-4000001',
    address: { city: 'San Salvador de Jujuy', street: 'Belgrano', number: 123, zipcode: '4600' }
  },
  {
    username: 'luisgomez',
    name: { firstname: 'Luis', lastname: 'Gómez' },
    email: 'luis.gomez@example.com',
    phone: '388-4000002',
    address: { city: 'San Salvador de Jujuy', street: 'Alvear', number: 456, zipcode: '4600' }
  },
  {
    username: 'marialopez',
    name: { firstname: 'María', lastname: 'López' },
    email: 'maria.lopez@example.com',
    phone: '387-4000003',
    address: { city: 'Salta', street: 'Caseros', number: 789, zipcode: '4400' }
  },
  {
    username: 'jorgefernandez',
    name: { firstname: 'Jorge', lastname: 'Fernández' },
    email: 'jorge.fernandez@example.com',
    phone: '388-4000004',
    address: { city: 'Palpalá', street: 'Río de la Plata', number: 210, zipcode: '4612' }
  },
  {
    username: 'luciamartinez',
    name: { firstname: 'Lucía', lastname: 'Martínez' },
    email: 'lucia.martinez@example.com',
    phone: '381-4000005',
    address: { city: 'San Miguel de Tucumán', street: '25 de Mayo', number: 1500, zipcode: '4000' }
  },
  {
    username: 'carlosrodriguez',
    name: { firstname: 'Carlos', lastname: 'Rodríguez' },
    email: 'carlos.rodriguez@example.com',
    phone: '388-4000006',
    address: { city: 'Perico', street: 'San Martín', number: 75, zipcode: '4608' }
  },
  {
    username: 'sofiaromero',
    name: { firstname: 'Sofía', lastname: 'Romero' },
    email: 'sofia.romero@example.com',
    phone: '387-4000007',
    address: { city: 'Salta', street: 'Mitre', number: 342, zipcode: '4400' }
  }
];

async function seed() {
  const coleccion = db.collection('clientes');

  // Si ya hay datos no se vuelve a cargar, así no se duplican clientes.
  const existentes = await coleccion.limit(1).get();
  if (!existentes.empty) {
    console.log('La colección clientes ya tiene datos. No se carga nada.');
    return;
  }

  for (const cliente of clientes) {
    await coleccion.add(cliente);
  }

  console.log('Se cargaron ' + clientes.length + ' clientes de prueba.');
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error al cargar los datos de prueba:', error);
    process.exit(1);
  });