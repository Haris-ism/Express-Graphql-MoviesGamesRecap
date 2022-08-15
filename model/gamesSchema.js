const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        singlePlayer: {
            type: Boolean,
            required: true
        },
        multiPlayer: {
            type: Boolean,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        release: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('game', ProductSchema)