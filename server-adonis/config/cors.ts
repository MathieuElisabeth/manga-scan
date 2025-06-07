import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: process.env.CORS_ENABLED === 'true',
  origin: process.env.CORS_ORIGIN?.split(',') || ['*'],
  methods: process.env.CORS_METHODS?.split(',') || ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: process.env.CORS_HEADERS?.split(',') || ['Content-Type', 'Authorization'],
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig