var express = require('express');
var kafka = require('kafka-node');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
});


app.get('/kafkaPoducer',function(req,res){
    res.json({greeting:'Kafka Producer'});
});

app.post('/kafkaProducer',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    console.log("1.", req.body.topic);
    console.log("2" , req.body.message);
    console.log("3", sentMessage);
    payloads = [
        { topic: "node-topic", messages: req.body, partition: 0}
    ];
    producer.send(payloads, function (err, data) {
        //console.log(payloads);
       // console.log(data);
            res.json(data);
    });
    
})

app.listen(5001,function(){
    console.log('Kafka producer running at 5001');
});

