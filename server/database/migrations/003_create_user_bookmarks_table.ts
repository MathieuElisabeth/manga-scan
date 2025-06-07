import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('manga_id').unsigned().references('id').inTable('mangas').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      
      table.unique(['user_id', 'manga_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}