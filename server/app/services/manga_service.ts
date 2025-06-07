import fs from 'fs/promises'
import path from 'path'

export default class MangaService {
  private static mangaStoragePath = process.env.MANGA_STORAGE_PATH || './storage/mangas'

  static async getMangaImage(slug: string): Promise<string | null> {
    try {
      const mangaPath = path.join(this.mangaStoragePath, slug)
      const files = await fs.readdir(mangaPath)
      
      // Find the cover image (same name as folder)
      const coverFile = files.find(file => {
        const nameWithoutExt = path.parse(file).name
        return nameWithoutExt === slug && (file.endsWith('.jpg') || file.endsWith('.png'))
      })

      if (coverFile) {
        const imagePath = path.join(mangaPath, coverFile)
        const imageBuffer = await fs.readFile(imagePath)
        return imageBuffer.toString('base64')
      }

      return null
    } catch (error) {
      console.error(`Error getting manga image for ${slug}:`, error)
      return null
    }
  }

  static async getChapterPages(slug: string, chapter: string): Promise<string[]> {
    try {
      const chapterPath = path.join(this.mangaStoragePath, slug, 'chapters', chapter)
      const files = await fs.readdir(chapterPath)
      
      // Sort files numerically
      const sortedFiles = files
        .filter(file => file.endsWith('.jpg') || file.endsWith('.png'))
        .sort((a, b) => {
          const aNum = parseInt(path.parse(a).name)
          const bNum = parseInt(path.parse(b).name)
          return aNum - bNum
        })

      const pages = await Promise.all(
        sortedFiles.map(async (file) => {
          const filePath = path.join(chapterPath, file)
          const imageBuffer = await fs.readFile(filePath)
          return imageBuffer.toString('base64')
        })
      )

      return pages
    } catch (error) {
      console.error(`Error getting chapter pages for ${slug}/${chapter}:`, error)
      throw new Error('Chapter not found')
    }
  }

  static async ensureStorageDirectory(): Promise<void> {
    try {
      await fs.access(this.mangaStoragePath)
    } catch {
      await fs.mkdir(this.mangaStoragePath, { recursive: true })
    }
  }
}