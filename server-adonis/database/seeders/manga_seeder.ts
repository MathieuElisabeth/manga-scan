import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Manga from '#models/manga'

export default class extends BaseSeeder {
  async run() {
    const mangas = [
      {
        name: 'Bleach',
        slug: 'bleach',
        author: 'Tite Kubo',
        description: 'Ichigo Kurosaki is a teenager gifted with the ability to see spirits. His life is drastically changed by the sudden appearance of a Soul Reaper—one who governs the flow of souls between the human world and the afterlife—named Rukia Kuchiki, who arrives in search of a Hollow, a dangerous lost soul.',
        type: 'Shōnen',
        year: 2001,
        inProgress: false,
        isAnime: true,
        views: 15420,
        genres: ['Action', 'Aventure', 'Surnaturel', 'School Life'],
        banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop'
      },
      {
        name: 'Naruto',
        slug: 'naruto',
        author: 'Masashi Kishimoto',
        description: 'Naruto Uzumaki is a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
        type: 'Shōnen',
        year: 1999,
        inProgress: false,
        isAnime: true,
        views: 25680,
        genres: ['Action', 'Aventure', 'Art Martial', 'Comédie'],
        banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop'
      },
      {
        name: 'One Piece',
        slug: 'one-piece',
        author: 'Eiichiro Oda',
        description: 'Monkey D. Luffy explores the Grand Line with his diverse crew of pirates, named the Straw Hat Pirates, to find the world\'s ultimate treasure known as "One Piece" in order to become the next Pirate King.',
        type: 'Shōnen',
        year: 1997,
        inProgress: true,
        isAnime: true,
        views: 35920,
        genres: ['Action', 'Aventure', 'Comédie', 'Drame'],
        banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop'
      },
      {
        name: 'Blue Lock',
        slug: 'blue-lock',
        author: 'Muneyuki Kaneshiro',
        description: 'After a disastrous defeat at the 2018 World Cup, Japan\'s team struggles to regroup. But what\'s missing? An absolute Ace Striker, who can guide them to the win.',
        type: 'Shōnen',
        year: 2018,
        inProgress: true,
        isAnime: true,
        views: 12450,
        genres: ['Sport', 'Drame', 'School Life'],
        banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop'
      },
      {
        name: 'Kaiju No. 8',
        slug: 'kaiju-no-8',
        author: 'Naoya Matsumoto',
        description: 'In a world plagued by creatures known as kaiju, Kafka Hibino aspired to enlist in The Defense Force. He makes a promise to enlist with his childhood friend, Mina Ashiro.',
        type: 'Shōnen',
        year: 2020,
        inProgress: true,
        isAnime: true,
        views: 8930,
        genres: ['Action', 'Science-fiction', 'Surnaturel'],
        banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop'
      }
    ]

    await Manga.createMany(mangas)
  }
}