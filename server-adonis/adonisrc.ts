import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register. The order of commands does not matter.
  |
  */
  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to register. The order of providers matters.
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    () => import('@adonisjs/core/providers/repl_provider'),
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/cors/cors_provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('#start/routes'),
    () => import('#start/kernel'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        files: ['tests/unit/**/*.spec(.ts|.js)'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/functional/**/*.spec(.ts|.js)'],
        name: 'functional',
        timeout: 30000,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | TypeScript configuration
  |--------------------------------------------------------------------------
  |
  | Configure how the TypeScript compiler works. The compiler options are used
  | only when creating the production build.
  |
  */
  typescript: {
    ignoreDiagnostics: [],
  },

  /*
  |--------------------------------------------------------------------------
  | Aliases
  |--------------------------------------------------------------------------
  |
  | Configure import aliases for when running in production.
  |
  */
  aliases: {
    '#controllers': 'app/controllers',
    '#exceptions': 'app/exceptions',
    '#models': 'app/models',
    '#middleware': 'app/middleware',
    '#validators': 'app/validators',
    '#services': 'app/services',
    '#start': 'start',
    '#config': 'config',
    '#database': 'database',
    '#tests': 'tests',
  },

  /*
  |--------------------------------------------------------------------------
  | Metafiles
  |--------------------------------------------------------------------------
  |
  | A collection of files you want to copy to the production build.
  |
  */
  metaFiles: [
    {
      pattern: 'resources/views/**/*.edge',
      reloadServer: false,
    },
    {
      pattern: 'public/**',
      reloadServer: false,
    },
  ],

  assetsBundler: false,
})