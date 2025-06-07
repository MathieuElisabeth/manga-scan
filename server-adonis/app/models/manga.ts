import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Manga extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare alternative: string | null

  @column()
  declare author: string

  @column()
  declare description: string

  @column()
  declare banner: string | null

  @column()
  declare type: string | null

  @column()
  declare year: number | null

  @column()
  declare inProgress: boolean

  @column()
  declare isAnime: boolean

  @column()
  declare views: number

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare genres: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'user_bookmarks',
    pivotForeignKey: 'manga_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  declare bookmarkedBy: ManyToMany<typeof User>
}