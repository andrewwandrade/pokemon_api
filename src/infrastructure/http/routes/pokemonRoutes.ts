import { Router } from 'express';
import { makePokemonController } from '@main/factories/pokemonController.factory';

const pokemonRoutes = Router();
const pokemonController = makePokemonController();

pokemonRoutes.get('/pokemons', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os pokémons'
    #swagger.description = 'Retorna uma lista de pokémons cadastrados.'
    #swagger.deprecated = false
    #swagger.parameters['type'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Filtra pokémons pelo tipo (ex: electric, fire, water)',
      example: 'electric'
    }
    #swagger.responses[200] = {
      description: 'Lista de pokémons retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1' },
                name: { type: 'string', example: 'Pikachu' },
                type: { type: 'string', example: 'electric' },
                height: { type: 'number', example: 4 },
                weight: { type: 'number', example: 60 }
              }
            }
          }
        }
      }
    }
    */
  return pokemonController.list(req, res);
});

pokemonRoutes.get('/pokemons/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca um pokémon pelo ID'
    #swagger.description = 'Retorna os dados de um único pokémon a partir do seu ID.'
    #swagger.deprecated = false
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID do pokémon',
      example: '1'
    }
    #swagger.responses[200] = {
      description: 'Pokémon encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'Pikachu' },
              type: { type: 'string', example: 'electric' },
              height: { type: 'number', example: 4 },
              weight: { type: 'number', example: 60 }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'ID inválido',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'ID inválido.' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokémon não encontrado' }
            }
          }
        }
      }
    }
    */

  return pokemonController.getById(req, res);
});

pokemonRoutes.post('/pokemons', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cria um novo pokémon'
    #swagger.description = 'Cadastra um novo pokémon com os dados informados no corpo da requisição.'
    #swagger.deprecated = false
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Pikachu' },
              type: { type: 'string', example: 'electric' },
              height: { type: 'number', example: 4 },
              weight: { type: 'number', example: 60 }
            },
            required: ['name', 'type', 'height', 'weight']
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Pokémon criado com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'Pikachu' },
              type: { type: 'string', example: 'electric' },
              height: { type: 'number', example: 4 },
              weight: { type: 'number', example: 60 }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Campos obrigatórios ausentes',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Campos obrigatórios ausentes.' }
            }
          }
        }
      }
    }
    */

  return pokemonController.create(req, res);
});

pokemonRoutes.put('/pokemons/:id', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza dados de um Pokémon'
    #swagger.description = 'Altera as informações de um Pokémon existente pelo seu ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        required: true,
        description: 'ID do Pokémon a ser atualizado'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Raichu' },
                        type: { type: 'string', example: 'electric' },
                        height: { type: 'number', example: 8 },
                        weight: { type: 'number', example: 300 }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
      description: 'Pokémon atualizado com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'Raichu' },
              type: { type: 'string', example: 'electric' },
              height: { type: 'number', example: 8 },
              weight: { type: 'number', example: 300 }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'ID inválido',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'ID inválido.' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokémon não encontrado' }
            }
          }
        }
      }
    }
    */

  return pokemonController.update(req, res);
});

pokemonRoutes.delete('/pokemons/:id', (req, res) => {
  /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Remove um Pokémon do catálogo'
      #swagger.description = 'Exclui permanentemente um Pokémon do registro local.'
      #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        required: true,
        description: 'ID do Pokémon a ser excluído'
      }
      #swagger.responses[204] = { description: 'Pokémon excluído com sucesso (sem conteúdo)' }
      #swagger.responses[400] = {
        description: 'ID inválido',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'ID inválido.' }
              }
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Pokémon não encontrado' }
              }
            }
          }
        }
      }
    */

  return pokemonController.delete(req, res);
});

export { pokemonRoutes };
