import vine from '@vinejs/vine'

export const createMangaValidator = vine.compile(
  vine.object({
    name: vine.string(),
    slug: vine.string(),
    author: vine.string(),
    alternative: vine.string().optional(),
    description: vine.string(),
    banner: vine.string().optional(),
    type: vine.string().optional(),
    year: vine.number().optional(),
    in_progress: vine.boolean().optional(),
    is_anime: vine.boolean().optional(),
    genres: vine.array(vine.string()),
  })
)