let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Demo1', {useNewUrlParser : true});
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

let CustomerSchema = new mongoose.Schema({
    name: String,
    email:{
       type: String, 
       require: true,
       unique: true
    }
})
module.exports = mongoose.model('Customer', CustomerSchema)