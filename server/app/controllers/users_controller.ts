import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Manga from '#models/manga'
import { updateProfileValidator } from '#validators/user'

export default class UsersController {
  async profile({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load('bookmarks')
    
    return response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        bookmarks: user.bookmarks.map(manga => manga.id)
      }
    })
  }

  async updateProfile({ request, response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(updateProfileValidator)

      // Check if username/email is already taken by another user
      if (payload.username && payload.username !== user.username) {
        const existingUser = await User.query()
          .where('username', payload.username)
          .whereNot('id', user.id)
          .first()

        if (existingUser) {
          return response.status(400).json({
            message: 'Ce pseudo est déjà utilisé',
            field: 'username'
          })
        }
      }

      if (payload.email && payload.email !== user.email) {
        const existingUser = await User.query()
          .where('email', payload.email)
          .whereNot('id', user.id)
          .first()

        if (existingUser) {
          return response.status(400).json({
            message: 'Cet email est déjà utilisé',
            field: 'email'
          })
        }
      }

      user.merge(payload)
      await user.save()

      return response.json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error updating profile'
      })
    }
  }

  async getBookmarks({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await user.load('bookmarks')

      const bookmarksWithImages = await Promise.all(
        user.bookmarks.map(async (manga) => {
          // In a real implementation, you'd get the image from file storage
          // For now, we'll return the manga data without the actual image
          return {
            id: manga.id,
            slug: manga.slug,
            name: manga.name,
            // image: await this.getMangaImage(manga.slug) // Implement this method
          }
        })
      )

      return response.json(bookmarksWithImages)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching bookmarks'
      })
    }
  }

  async toggleBookmark({ request, response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const { mangaId } = request.only(['mangaId'])

      await Manga.findOrFail(mangaId)
      
      // Check if bookmark exists
      const existingBookmark = await user
        .related('bookmarks')
        .query()
        .where('manga_id', mangaId)
        .first()

      if (existingBookmark) {
        // Remove bookmark
        await user.related('bookmarks').detach([mangaId])
        return response.json({ message: 'Favorite removed!' })
      } else {
        // Add bookmark
        await user.related('bookmarks').attach([mangaId])
        return response.json({ message: 'Favorite added!' })
      }
    } catch (error) {
      return response.status(500).json({
        message: 'Error toggling bookmark'
      })
    }
  }
}