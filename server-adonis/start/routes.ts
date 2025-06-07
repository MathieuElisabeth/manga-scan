import router from '@adonisjs/core/services/router'

const MangasController = () => import('#controllers/mangas_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

// Auth routes
router.group(() => {
  router.post('/signup', [AuthController, 'signup'])
  router.post('/signin', [AuthController, 'signin'])
  router.post('/logout', [AuthController, 'logout'])
}).prefix('/api/auth')

// User routes
router.group(() => {
  router.get('/profile', [UsersController, 'profile'])
  router.put('/profile', [UsersController, 'updateProfile'])
  router.get('/bookmarks', [UsersController, 'getBookmarks'])
  router.post('/bookmarks', [UsersController, 'toggleBookmark'])
}).prefix('/api/user').middleware('auth')

// Manga routes
router.group(() => {
  router.get('/', [MangasController, 'index'])
  router.get('/:slug', [MangasController, 'show'])
  router.get('/:slug/:chapter', [MangasController, 'getChapterPages'])
  router.post('/upload', [MangasController, 'uploadMangaData'])
}).prefix('/api/manga')

// Health check
router.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})