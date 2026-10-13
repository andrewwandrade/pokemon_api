import { Router } from 'express';
import { makePokedexController } from '@main/factories/pokedexController.factory';

const pokedexRoutes = Router();
const controller = makePokedexController();

pokedexRoutes.get('/pokedex/search', (req, res) => {
  /*
    #swagger.tags = ['Pokédex']
    #swagger.summary = 'Busca um Pokémon na PokéAPI oficial'
    #swagger.description = 'Consulta diretamente a PokéAPI e retorna os dados formatados (imagem, tipos e atributos base).'
    #swagger.deprecated = false
    #swagger.parameters['name'] = {
      in: 'query',
      type: 'string',
      required: true,
      description: 'Nome do Pokémon',
      example: 'pikachu'
    }
    #swagger.responses[200] = {
      description: 'Pokémon encontrado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
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
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Parâmetro name ausente ou inválido',
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
      description: 'Pokémon não encontrado na PokéAPI',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokémon não encontrado(a)' }
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

  return controller.search(req, res);
});

export { pokedexRoutes };