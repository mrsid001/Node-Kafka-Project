var express = require ('express');
var bodyParser = require ('body-parser');
var routes = require ('./route/route');
var mongoose = require ('mongoose');
var graphqlHTTP = require ('express-graphql');
//var kafka_producer = require ('./kafka/kafka_producer');
var kafka_consumer = require ('./kafka/kafka_consumer');


mongoose.connect('mongodb://localhost/Claim', {useNewUrlParser : true});
mongoose.Promise = global.Promise; 

var app = express();

app.use(bodyParser.json());

app.use(routes);
app.use(function(err,req,res,next){
res.status(422).send({error : err._message});
});


app.listen(9012, (err,conn) => {
if (err) console.log("err");
console.log("Server is listening to port 9012");
});
