import app from '@adonisjs/core/services/app'
import type { HttpContext, ExceptionHandler } from '@adonisjs/core/types'

export default class HttpExceptionHandler implements ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    /**
     * Self handle the validation exception
     */
    if (error && typeof error === 'object' && 'code' in error && error.code === 'E_VALIDATION_ERROR') {
      return ctx.response.status(422).json({
        message: 'Validation failed',
        errors: error
      })
    }

    /**
     * Forward rest of the exceptions to the default exception handler
     */
    const { default: app } = await import('@adonisjs/core/services/app')
    return app.container.make('HttpExceptionHandler').handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    const { default: app } = await import('@adonisjs/core/services/app')
    return app.container.make('HttpExceptionHandler').report(error, ctx)
  }
}