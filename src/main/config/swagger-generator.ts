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
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Criar, editar, atualizar e listar Pokémons',
    },
    {
      name: 'Trainers',
      description: 'Cadastro de treinadores e consulta do time ativo',
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
  path.resolve(__dirname, '../../infrastructure/http/routes/trainerRoutes.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/pokedexRoutes.ts'),
];

swaggerAutogen({
  openapi: '3.0.0',
  autoQuery: false,
  autoBody: false,
  autoHeaders: false,
})(outputFile, endpointsFiles, doc);
