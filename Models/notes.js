const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema({
    task: String,
    date: {
        type: String,
        default: Date.now()
    }
})

const noteModel = mongoose.model("notes", notesSchema)
module.exports = noteModel