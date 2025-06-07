# Manga Scan Backend - AdonisJS

A modern manga scanning application backend built with AdonisJS 6 and PostgreSQL.

## Features

- **Modern Architecture**: Built with AdonisJS 6, TypeScript, and PostgreSQL
- **Authentication**: Session-based authentication with secure password hashing
- **User Management**: User registration, login, profile updates
- **Manga Management**: CRUD operations for manga data
- **Bookmarks**: Users can bookmark their favorite mangas
- **File Storage**: Efficient manga image and chapter page storage
- **Validation**: Comprehensive request validation using VineJS
- **Database**: PostgreSQL with Lucid ORM for robust data management

## Tech Stack

- **Framework**: AdonisJS 6
- **Database**: PostgreSQL
- **ORM**: Lucid ORM
- **Validation**: VineJS
- **Authentication**: AdonisJS Auth (Session-based)
- **Language**: TypeScript

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials and other configuration.

3. **Generate Application Key**:
   ```bash
   node ace generate:key
   ```

4. **Database Setup**:
   ```bash
   # Run migrations
   node ace migration:run
   
   # Seed the database (optional)
   node ace db:seed
   ```

5. **Create Storage Directory**:
   ```bash
   mkdir -p storage/mangas
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3333`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/bookmarks` - Get user bookmarks
- `POST /api/user/bookmarks` - Toggle manga bookmark

### Manga
- `GET /api/manga` - Get all mangas
- `GET /api/manga/:slug` - Get manga details
- `GET /api/manga/:slug/:chapter` - Get chapter pages
- `POST /api/manga/upload` - Upload manga data

### Health Check
- `GET /health` - API health status

## Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `created_at` / `updated_at` - Timestamps

### Mangas Table
- `id` - Primary key
- `name` - Manga name
- `slug` - URL-friendly identifier
- `author` - Manga author
- `description` - Manga description
- `genres` - JSON array of genres
- `type` - Manga type (Shōnen, Seinen, etc.)
- `year` - Publication year
- `in_progress` - Whether manga is ongoing
- `is_anime` - Whether has anime adaptation
- `views` - View count
- `created_at` / `updated_at` - Timestamps

### User Bookmarks Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `manga_id` - Foreign key to mangas
- `created_at` / `updated_at` - Timestamps

## File Storage

Manga images and chapter pages are stored in the file system:
```
storage/mangas/
├── manga-slug/
│   ├── manga-slug.jpg (cover image)
│   └── chapters/
│       ├── 1/
│       │   ├── 01.jpg
│       │   ├── 02.jpg
│       │   └── ...
│       ├── 2/
│       └── ...
```

## Migration from Express

This AdonisJS backend replaces the previous Express.js implementation with:

1. **Better Structure**: Organized controllers, models, and services
2. **Type Safety**: Full TypeScript support with proper typing
3. **Modern ORM**: Lucid ORM instead of raw MongoDB queries
4. **Validation**: Built-in request validation
5. **Authentication**: Secure session-based auth
6. **Database**: PostgreSQL for better data integrity
7. **Scalability**: Better architecture for future growth

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set environment variables**:
   - `NODE_ENV=production`
   - Database credentials
   - `APP_KEY` (generate with `node ace generate:key`)

3. **Run migrations**:
   ```bash
   node ace migration:run --force
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.