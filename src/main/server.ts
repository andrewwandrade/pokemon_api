import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { pokemonRoutes } from '../infrastructure/http/routes/pokemonRoutes'; 
import swaggerDocument from './config/swagger-output.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/api/docs`);
});