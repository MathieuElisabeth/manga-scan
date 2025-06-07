import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga'
import { createMangaValidator } from '#validators/manga'
import MangaService from '#services/manga_service'

export default class MangasController {
  async index({ response }: HttpContext) {
    try {
      const mangas = await Manga.all()
      
      const mangasWithImages = await Promise.all(
        mangas.map(async (manga) => {
          const image = await MangaService.getMangaImage(manga.slug)
          return {
            id: manga.slug,
            name: manga.name,
            image,
            banner: manga.banner,
            type: manga.type,
            genres: manga.genres,
            year: manga.year,
            in_progress: manga.inProgress,
            views: manga.views,
          }
        })
      )

      return response.json(mangasWithImages)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching mangas'
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const manga = await Manga.findByOrFail('slug', params.slug)
      const image = await MangaService.getMangaImage(manga.slug)
      
      return response.json({
        ...manga.serialize(),
        thumbnail: image,
        in_progress: manga.inProgress,
        is_anime: manga.isAnime,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Manga not found'
      })
    }
  }

  async getChapterPages({ params, response }: HttpContext) {
    try {
      const { slug, chapter } = params
      const pages = await MangaService.getChapterPages(slug, chapter)
      
      return response.json(pages)
    } catch (error) {
      return response.status(404).json({
        message: 'Chapter not found'
      })
    }
  }

  async uploadMangaData({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createMangaValidator)
      
      // Check if manga already exists
      const existingManga = await Manga.findBy('name', payload.name)
      if (existingManga) {
        return response.status(400).json({
          message: `${payload.name} data already uploaded!`
        })
      }

      const manga = await Manga.create({
        ...payload,
        inProgress: payload.in_progress,
        isAnime: payload.is_anime,
      })

      return response.status(201).json({
        message: `Manga ${manga.name} created!`
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error creating manga'
      })
    }
  }
}