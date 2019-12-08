const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    id: String,
    date: String,
    tapeNumber: Number,
    description: String,
    tags: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('Tags', TagSchema);
