# PokéManager API

Projeto desenvolvido para a disciplina de Tópicos Especiais em Engenharia de Software (UFF). 

## Entrega 1: Arquitetura Limpa, Repositório In-Memory e Contrato REST

### Escopo

Criação da estrutura base com Clean Architecture e gerenciamento do catálogo local em memória.

### Requisitos Técnicos

- Configuração do tsconfig.json rigoroso com path aliases (@domain/*, @application/*, etc.).
- ESLint e Prettier integrados e sem alertas.
- Interface IPokemonRepository na camada de Domínio e implementação InMemoryPokemonRepository.
- Rota /api/docs fornecendo a documentação interativa com Swagger / OpenAPI 3.0.

### Estrutura do projeto

/
│   .eslintrc.json
│   .gitignore
│   .prettierrc
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
└───src
    ├───application
    │   ├───dtos
    │   │       createPokemonDTO.ts
    │   │       updatePokemonDTO.ts
    │   │
    │   └───use-cases
    │           createPokemon.ts
    │           deletePokemon.ts
    │           getPokemonById.ts
    │           listPokemons.ts
    │           updatePokemon.ts
    │
    ├───domain
    │   ├───entities
    │   │       pokemon.ts
    │   │
    │   ├───errors
    │   └───repositories
    │           IPokemonRepository.ts
    │
    ├───infrastructure
    │   ├───database
    │   │   └───in-memory
    │   │           InMemoryPokemonRepository.ts
    │   │
    │   └───http
    │       ├───controllers
    │       │       pokemonController.ts
    │       │
    │       └───routes
    │               pokemonRoutes.ts
    │
    └───main
        │   server.ts
        │
        ├───config
        │       swagger-generator.ts
        │       swagger-output.json
        │
        └───factories
                pokemonController.factory.ts


### Fluxo de Funcionamento do Projeto

#### Inicialização

- `server.ts`: Inicializa o servidor, habilita o leitor de JSON e define as rotas base (/api/v1).
- `pokemonController.factory.ts`: Instancia o repositório em memória, os 5 casos de uso e o controller de Pokémons, conectando todas as dependências.

#### Chegada da requisição

- `pokemonRoutes.ts`: Intercepta a chamada HTTP e direciona o pedido para a função correspondente dentro do controlador.

#### Extração HTTP e validação de entrada

- `pokemonController.ts`: Extrai os parâmetros recebidos, faz validações simples de entrada e repassa os dados para o caso de uso.

#### Regras de negócio e "persistência"

- Use Cases: Executam e validam as regras de negócio da aplicação.
- `InMemoryPokemonRepository.ts`: Executa a leitura, criação, alteração ou deleção do registro armazenado no array da memória.

#### Resposta ao cliente

- `pokemonController.ts`: Recebe o retorno do caso de uso, define o status HTTP correto e envia o JSON final ao usuário.

## Entrega 2

...

## Entrega 3

...

## Entrega 4

...