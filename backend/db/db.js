const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/app', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('connect')
    } else {
        console.log('not connect')
    }
})
module.exports = mongoose;