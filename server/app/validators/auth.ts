import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(30),
    email: vine.string().email(),
    password: vine.string().minLength(5),
  })
)

export const signinValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)