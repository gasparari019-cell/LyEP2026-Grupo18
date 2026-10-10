require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientesRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando' });
});

app.use('/api/clientes', clientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});