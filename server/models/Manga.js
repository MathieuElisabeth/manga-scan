const mongoose = require('mongoose')

const Manga = mongoose.model(
    'mangas',
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        alternative: {
            type: String
        },
        slug: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            default: '',
        },
        banner: {
            type: String,
        },
        genres: {
            type: Array,
            required: true
        },
        type: {
            type: String
        },
        year: {
            type: Number
        },
        description: {
            type: String,
            required: true
        },
        in_progress: {
            type: Boolean
        },
        is_anime: {
            type: Boolean
        },
        updated: {
            type: Date,
            default: Date.now
        },
        views: {
            type: Number,
            default: 0
        }
    })
)

module.exports = Manga