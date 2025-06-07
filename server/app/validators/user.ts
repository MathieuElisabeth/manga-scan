import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(30).optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(5).optional(),
  })
)