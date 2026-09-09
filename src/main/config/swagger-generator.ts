import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API para gerenciamento de Pokémons',
    version: '1.0.0',
    description:
      'API desenvolvida para a disciplina Tópicos Especiais em Engenharia de Software (UFF)',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Criar, editar, atualizar e listar Pokémons',
    },
  ],
  components: {
    schemas: {
      Pokemon: {
        id: '1',
        name: 'Pikachu',
        type: 'Electric',
        height: 0.4,
        weight: 6.0,
      },
      PokemonInput: {
        name: 'Pikachu',
        type: 'Electric',
        height: 0.4,
        weight: 6.0,
      },
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemonRoutes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
