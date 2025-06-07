import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator, signinValidator } from '#validators/auth'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(signupValidator)
      
      // Check if user already exists
      const existingUser = await User.query()
        .where('username', payload.username)
        .orWhere('email', payload.email)
        .first()

      if (existingUser) {
        return response.status(400).json({
          message: existingUser.username === payload.username 
            ? 'Username already exists!' 
            : 'Email already exists!'
        })
      }

      const user = await User.create(payload)
      
      return response.status(201).json({
        message: 'User successfully created!',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      })
    } catch (error) {  
      return response.status(500).json({
        message: 'Internal server error',
        error: error
      })
    }
  }

  async signin({ request, response, auth }: HttpContext) {
    try {
      const { username, password } = await request.validateUsing(signinValidator)
      
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)

      // Load bookmarks
      await user.load('bookmarks')
      
      return response.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bookmarks: user.bookmarks.map(manga => manga.id)
        }
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Invalid credentials'
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.json({ message: 'Logout successful' })
  }
}