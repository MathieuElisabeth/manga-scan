const fs = require('fs')
const path = require('path')
const Manga = require('../models/Manga')

const getMangaNames = async (req, res) => {

    let returnItems = []
    const MANGA_FOLDER = path.join(__dirname, `../mangas`)
    const mangaNames = fs.readdirSync(MANGA_FOLDER)
    for (const mangas of mangaNames) {
        const mangaFolderUrl = `${MANGA_FOLDER}/${mangas}`
        const mangaFolder = fs.readdirSync(mangaFolderUrl)
        for (const items of mangaFolder) {
            const slug = mangas
            if (mangas === path.basename(items, '.jpg') || mangas === path.basename(items, '.png')) {
                const dbManga = await Manga.findOne({ slug }).exec()
                if (dbManga) {
                    returnItems.push({
                        name: dbManga.name,
                        id: dbManga.slug,
                        image: fs.readFileSync(`${mangaFolderUrl}/${items}`, 'base64'),
                        banner: dbManga.banner,
                        type: dbManga.type,
                        genres: dbManga.genres,
                        year: dbManga.year,
                        in_progress: dbManga.in_progress,
                        views: dbManga.views,
                    })
                }
            }
        }
    }
    res.send(returnItems)
}


const getMangaPages = (req, res) => {
    const { manga, chapter } = req.params
    const requestedMangaUrl = `${path.join(__dirname, `../mangas`)}/${manga}`
    fs.readdir(requestedMangaUrl, (err, files) => {
        if (err) {
            return res.json({ message: err })
        }
        let haveMangas = files.filter(item => item === 'chapters')
        haveMangas = `${requestedMangaUrl}/${haveMangas}`
        fs.readdir(haveMangas, (err, files) => {
            if (err) {
                return res.json({ message: err })
            }
            const haveChapter = files.indexOf(chapter)
            if (haveChapter === -1) {
                return res.json({ message: 'Error while searching this chapter.' })
            }
            haveMangas = `${haveMangas}/${chapter}`
            // Save the image as BASE64 and return as array
            fs.readdir(haveMangas, (err, chapters) => {
                if (err) {
                    return res.json({ message: err })
                }
                const imagesBase64 = []
                chapters.forEach(item => {
                    imagesBase64.push(fs.readFileSync(`${haveMangas}/${item}`, 'base64'))
                })
                // const imagesBase64 = fs.readFileSync(`${haveMangas}/${page}`, 'base64')
                return res.send(imagesBase64)
            })

        })
    })
}

const getMangaInfo = async (req, res) => {
    const { id } = req.params
    let image = ''
    const pathFile = path.join(__dirname, `../mangas/${id}`)
    const mangaFolder = fs.readdirSync(pathFile)
    for (const items of mangaFolder) {
        if (id === path.basename(items, '.jpg') || id === path.basename(items, '.png')) {
            image = fs.readFileSync(`${pathFile}/${items}`, 'base64')
        }
    }

    try {
        const mangaInfo = await Manga.findOne({ slug: id })
        mangaInfo.thumbnail = image
        return res.json(mangaInfo)
    } catch(err) {
        return res.json({ message: err })
    }
}

const uploadData = ((req, res) => {
    if (!req.body.name || !req.body.author || !req.body.genres || !req.body.description) {
        return res.json({ message: 'Incomplete request!' })
    }

    Manga.findOne(
        { name: req.body.name },
        (err, manga) => {
            if (err) {
                return res.json({ message: err })
            }

            if (manga) {
                return res.json({ message: `${req.body.name} data already uploaded!` })
            }

            const newManga = new Manga({
                name: req.body.name,
                author: req.body.author,
                alternative: req.body.alternative ? req.body.alternative : '',
                slug: req.body.slug,
                genres: [...req.body.genres],
                description: req.body.description,
                banner: req.body.banner,
                in_progress: req.body.in_progress,
                is_anime: req.body.is_anime,
                year: req.body.year,
                type: req.body.type,
                in_progress: req.body.in_progress,
            })

            newManga.save()
                .then(doc => {
                    res.json({ message: `Manga ${doc.name} created!` })
                })
                .catch(err => res.json({ message: err }))
        }
    )
})

module.exports = {
    getMangaPages,
    getMangaInfo,
    getMangaNames,
    uploadData
}