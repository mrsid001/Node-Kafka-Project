let express = require('express')
let app = express();
let customerRoute = require('./routes/customer')
let path = require('path')
let bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(customerRoute)
app.use(express.static('public'))

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>console.info('Server has started on 4000...'))