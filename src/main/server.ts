import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger-output.json';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemonRoutes';
import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';
import { trainerRoutes } from '@infrastructure/http/routes/trainerRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', pokemonRoutes);
app.use('/api/v1/trainers', trainerRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/api/docs`);
});
