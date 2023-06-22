const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('post', postSchema)