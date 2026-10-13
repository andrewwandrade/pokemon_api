import { Router } from 'express';
import { makeTrainerController } from '@main/factories/trainerController.factory';
import { makeCaptureController } from '@main/factories/captureController.factory';

const trainerRoutes = Router();
const trainerController = makeTrainerController();
const captureController = makeCaptureController();

trainerRoutes.post('/trainers', (req, res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Cadastra um novo treinador'
    #swagger.description = 'Cria um treinador. O e-mail deve ser único.'
    #swagger.deprecated = false
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Ash Ketchum' },
              email: { type: 'string', example: 'ash@pallet.com' }
            },
            required: ['name', 'email']
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Treinador criado com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10' },
              name: { type: 'string', example: 'Ash Ketchum' },
              email: { type: 'string', example: 'ash@pallet.com' },
              createdAt: { type: 'string', example: '2026-10-12T15:30:00.000Z' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Dados de entrada inválidos',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Dados de entrada inválidos' }
            }
          }
        }
      }
    }
    #swagger.responses[409] = {
      description: 'E-mail já cadastrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Já existe um treinador com esse e-mail' }
            }
          }
        }
      }
    }
    */

  return trainerController.create(req, res);
});

trainerRoutes.get('/trainers', (req, res) => { 
    /* 
      #swagger.tags = ['Trainers'] 
      #swagger.summary = 'Lista todos os treinadores' 
      #swagger.description = 'Retorna todos os treinadores cadastrados.' 
      #swagger.deprecated = false 
      #swagger.responses[200] = { 
        description: 'Lista de treinadores retornada com sucesso', 
        content: { 
        'application/json': { 
          schema: { 
            type: 'array', 
            items: { 
              type: 'object', 
              properties: { 
                id: { 
                  type: 'string', 
                  example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10' 
                }, 
                name: { 
                  type: 'string', 
                  example: 'Ash Ketchum' 
                }, 
                email: { 
                  type: 'string', 
                  example: 'ash@pallet.com' 
                }, 
                createdAt: { 
                  type: 'string', 
                  format: 'date-time', 
                  example: '2026-10-12T15:30:00.000Z' 
                } 
              } 
            } 
          } 
        } 
      } 
    } 
  */ 
  return trainerController.list(req, res); 

});

trainerRoutes.get('/trainers/:trainerId/team', (req, res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Lista o time ativo do treinador'
    #swagger.description = 'Retorna os Pokémons capturados que estão no time ativo (máximo de 6).'
    #swagger.deprecated = false
    #swagger.parameters['trainerId'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID (UUID) do treinador',
      example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10'
    }
    #swagger.responses[200] = {
      description: 'Time ativo do treinador',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '9a1d4c7e-2b3f-4a6d-8e90-1c2d3e4f5a6b' },
                trainerId: { type: 'string', example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10' },
                pokedexId: { type: 'integer', example: 25 },
                name: { type: 'string', example: 'pikachu' },
                imageUrl: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
                types: {
                  type: 'array',
                  items: { type: 'string' },
                  example: ['electric']
                },
                stats: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string', example: 'hp' },
                      value: { type: 'integer', example: 35 }
                    }
                  }
                },
                isActive: { type: 'boolean', example: true },
                capturedAt: { type: 'string', example: '2026-10-12T15:30:00.000Z' }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Treinador não encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Treinador não encontrado(a)' }
            }
          }
        }
      }
    }
    */

  return trainerController.team(req, res);
});

trainerRoutes.post('/trainers/:trainerId/captures', (req, res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Captura um Pokémon para o treinador'
    #swagger.description = 'Consulta a PokéAPI, valida o limite de 6 Pokémons no time ativo e salva a captura.'
    #swagger.deprecated = false
    #swagger.parameters['trainerId'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID (UUID) do treinador',
      example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              pokemonName: { type: 'string', example: 'pikachu' }
            },
            required: ['pokemonName']
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Pokémon capturado com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '9a1d4c7e-2b3f-4a6d-8e90-1c2d3e4f5a6b' },
              trainerId: { type: 'string', example: '3f2b8c1e-7a4d-4e1a-9c55-0d6f2a8b1e10' },
              pokedexId: { type: 'integer', example: 25 },
              name: { type: 'string', example: 'pikachu' },
              imageUrl: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
              types: { type: 'array', items: { type: 'string' }, example: ['electric'] },
              stats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'hp' },
                    value: { type: 'integer', example: 35 }
                  }
                }
              },
              isActive: { type: 'boolean', example: true },
              capturedAt: { type: 'string', example: '2026-10-12T15:30:00.000Z' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Dados de entrada inválidos',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Dados de entrada inválidos' }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Treinador ou Pokémon não encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Treinador não encontrado(a)' }
            }
          }
        }
      }
    }
    #swagger.responses[422] = {
      description: 'Time ativo já possui 6 Pokémons',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'O time ativo do treinador já possui 6 Pokémons' }
            }
          }
        }
      }
    }
    #swagger.responses[502] = {
      description: 'PokéAPI indisponível',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Serviço externo indisponível: PokéAPI' }
            }
          }
        }
      }
    }
    */

  return captureController.create(req, res);
});

export { trainerRoutes };