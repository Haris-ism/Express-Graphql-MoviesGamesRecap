const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        title: {
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
        rating: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('movie', ProductSchema)