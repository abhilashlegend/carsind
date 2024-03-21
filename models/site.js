const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tagline: {
        type: String
    },
    showtopbar: {
        type: Boolean
    },
    showcarousel: {
        type: Boolean
    }
})


module.exports = mongoose.model('Site', SiteSchema);