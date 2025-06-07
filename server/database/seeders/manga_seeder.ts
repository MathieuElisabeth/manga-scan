import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Manga from '#models/manga'

export default class extends BaseSeeder {
  async run() {
    const mangas = [
      {
        name: 'Bleach',
        slug: 'bleach',
        author: 'Tite Kubo',
        description: 'Ichigo Kurosaki est un adolescent capable de voir les esprits. Sa vie change radicalement lorsqu\'il rencontre Rukia Kuchiki, une Shinigami venue traquer un Hollow, une âme errante dangereuse.',
        type: 'Shōnen',
        year: 2001,
        inProgress: false,
        isAnime: true,
        views: 15420,
        genres: ['Action', 'Aventure', 'Surnaturel', 'School Life'],
        banner: 'https://dw9to29mmj727.cloudfront.net/promo/2016/6389-Header_BleachTYBW_2000x800.jpg'
      },
      {
        name: 'Naruto',
        slug: 'naruto',
        author: 'Masashi Kishimoto',
        description: 'Naruto Uzumaki est un jeune ninja qui cherche à être reconnu par ses pairs et rêve de devenir Hokage, le chef de son village.',
        type: 'Shōnen',
        year: 1999,
        inProgress: false,
        isAnime: true,
        views: 25680,
        genres: ['Action', 'Aventure', 'Art Martial', 'Comédie'],
        banner: 'https://www.pixelstalk.net/wp-content/uploads/images8/Naruto-Wallpaper-Desktop.jpg'
      },
      {
        name: 'One Piece',
        slug: 'one-piece',
        author: 'Eiichiro Oda',
        description: 'Monkey D. Luffy parcourt la Grand Line avec son équipage hétéroclite, les Chapeaux de paille, à la recherche du légendaire trésor "One Piece" pour devenir le Roi des Pirates.',
        type: 'Shōnen',
        year: 1997,
        inProgress: true,
        isAnime: true,
        views: 35920,
        genres: ['Action', 'Aventure', 'Comédie', 'Drame'],
        banner: 'https://comicbook.com/wp-content/uploads/sites/4/2022/03/ce952cf7-cf82-4680-9a17-59b217266037.jpg'
      },
      {
        name: 'Blue Lock',
        slug: 'blue-lock',
        author: 'Muneyuki Kaneshiro',
        description: 'Après une défaite catastrophique à la Coupe du Monde 2018, le Japon cherche à créer le meilleur attaquant grâce au programme Blue Lock, un centre d\'entraînement impitoyable.',
        type: 'Shōnen',
        year: 2018,
        inProgress: true,
        isAnime: true,
        views: 12450,
        genres: ['Sport', 'Drame', 'School Life'],
        banner: 'https://4kwallpapers.com/images/wallpapers/blue-lock-anime-3840x1080-20022.jpg'
      },
      {
        name: 'Kaiju No. 8',
        slug: 'kaiju-no-8',
        author: 'Naoya Matsumoto',
        description: 'Dans un monde envahi par des créatures appelées kaijus, Kafka Hibino rêve de rejoindre les Forces de Défense après avoir fait une promesse à son amie d\'enfance, Mina Ashiro.',
        type: 'Shōnen',
        year: 2020,
        inProgress: true,
        isAnime: true,
        views: 8930,
        genres: ['Action', 'Science-fiction', 'Surnaturel'],
        banner: 'https://dw9to29mmj727.cloudfront.net/promo/2016/6282-Header_KaijuNo8_2000x800.jpg'
      },
      {
        name: 'Chainsaw Man',
        slug: 'chainsaw-man',
        author: 'Tatsuki Fujimoto',
        description: 'Denji, un jeune homme endetté, fusionne avec son démon-tronçonneuse Pochita pour devenir Chainsaw Man et chasse les démons pour le compte de la Sécurité Publique.',
        type: 'Shōnen',
        year: 2018,
        inProgress: true,
        isAnime: true,
        views: 18950,
        genres: ['Action', 'Horreur', 'Surnaturel', 'Drame'],
        banner: 'https://i0.wp.com/www.comicbookrevolution.com/wp-content/uploads/2023/02/Chainsaw-Man-Volume-1-Banner.jpg'
      },
      {
        name: 'My Hero Academia',
        slug: 'my-hero-academia',
        author: 'Kōhei Horikoshi',
        description: 'Dans un monde où la majorité des humains possèdent des pouvoirs appelés Alters, Izuku Midoriya rêve de devenir un héros malgré son absence de pouvoir.',
        type: 'Shōnen',
        year: 2014,
        inProgress: true,
        isAnime: true,
        views: 27800,
        genres: ['Action', 'Super-héros', 'School Life', 'Drame'],
        banner: 'https://comicbook.com/wp-content/uploads/sites/4/2022/03/ce952cf7-cf82-4680-9a17-59b217266037.jpg'
      },
      {
        name: 'Jujutsu Kaisen',
        slug: 'jujutsu-kaisen',
        author: 'Gege Akutami',
        description: 'Yuji Itadori se retrouve plongé dans un monde occulte peuplé d\'esprits maudits après avoir ingéré un objet maudit extrêmement puissant.',
        type: 'Shōnen',
        year: 2018,
        inProgress: true,
        isAnime: true,
        views: 24600,
        genres: ['Action', 'Surnaturel', 'Horreur', 'School Life'],
        banner: 'https://animenew.com.br/wp-content/uploads/2023/01/Jujutsu-Kaisen-autor-planeja-terminar-o-manga-este-ano-jpg.webp'
      },
      {
        name: 'Tokyo Shinobi Squad',
        slug: 'tokyo-shinobi-squad',
        author: 'Yuki Tanaka & Kento Matsuura',
        description: 'Dans un futur Tokyo ravagé par la criminalité et le terrorisme, les shinobis renaissent comme combattants d\'élite pour rétablir l\'ordre.',
        type: 'Shōnen',
        year: 2019,
        inProgress: false,
        isAnime: false,
        views: 5230,
        genres: ['Action', 'Science-fiction', 'Crime'],
        banner: 'https://www.journaldujapon.com/wp-content/uploads/2020/11/tokyo-shinobi-squad-cover2.jpg'
      }
    ]

    await Manga.createMany(mangas)
  }
}
