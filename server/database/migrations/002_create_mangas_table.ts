import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mangas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('alternative').nullable()
      table.string('author').notNullable()
      table.text('description').notNullable()
      table.string('banner').nullable()
      table.string('type').nullable()
      table.integer('year').nullable()
      table.boolean('in_progress').defaultTo(true)
      table.boolean('is_anime').defaultTo(false)
      table.integer('views').defaultTo(0)
      table.json('genres').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}