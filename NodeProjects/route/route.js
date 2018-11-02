var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');
var CustomerCDM = require('../model/Customer-CDM_Model');
var Claims= require('../model/Claim_Model');
//var Adress = require('../model/Address_Model');
var schema = require('../schema/SOR_GraphQL');
var kafka = require('kafka-node');

var Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

producer.on('ready', function () {
    console.log('Kafka Producer is ready');
});

producer.on('error', function (err) {
    console.log('Kafka Producer is in error state');
    console.log(err);
});

router.use('/graphql',graphqlHTTP({
schema,
rootValue: root,
graphiql: true
}));


router.get('/Customer', function(req,res,next){
CustomerCDM.find({}).then(function(CustomerCDM){
res.send(CustomerCDM);
}).catch(next); 
});
router.get('/Customer/:Customer_Id', function(req,res,next){
CustomerCDM.find({Customer_Id:req.params.Customer_Id}).then(function(CustomerCDM){
res.send(CustomerCDM);
}).catch(next);   
});

router.post('/Customer', function(req,res,next){
  // console.log('1_________________');
  var JSONString = JSON.stringify(req.body);
  console.log('1______',req.body);
  CustomerCDM.create(req.body).then(function(CustomerCDM){
    payloads = [
        { topic: "node-topic", messages: JSONString, partition: 0}
    ];
    producer.send(payloads, function (err, data) {
        console.log('2____',payloads);
       //  console.log('2_________________');
       //console.log('2_____Message Published to Kafka Producer');
            res.json(data);
    });
     // res.send(Customer);
  }).catch(next);
});

router.put('/Customer/:Id', function(req,res,next){
  var JSONString = JSON.stringify(req.body);
  console.log('1______',req.body);

CustomerCDM.findOneAndUpdate({Customer_Id:req.params.Id},req.body,function(err, CustomerCDM){
 payloads = [
        { topic: "node-topic", messages: JSONString, partition: 0}
    ];
    producer.send(payloads, function (err, data) {
        console.log('2____',payloads);
       //  console.log('2_________________');
       //console.log('2_____Message Published to Kafka Producer');
            res.json(data);
    });
});
});



/*
CustomerCDM.findOneAndUpdate({Customer_Id:req.params.Customer_Id},req.body).then(function(CustomerCDM){
  payloads = [
        { topic: "node-topic", messages: JSONString, partition: 0}
    ];
    producer.send(payloads, function (err, data) {
        console.log('2____',payloads);
       //  console.log('2_________________');
       //console.log('2_____Message Published to Kafka Producer');
            res.json(data);
    });
//res.send(Customer);
}).catch(next);
});
*/
router.delete('/Customer/:Id', function(req,res,next){
CustomerCDM.findOneAndRemove({_id:req.params.Id}).then(function(CustomerCDM){
res.send(CustomerCDM);
}).catch(next);
});

router.post('/Claim', function(req,res,next){
  // console.log('1_________________');
  var JSONString = JSON.stringify(req.body);
  console.log('1______',req.body);
  

  Claims.create(req.body).then(function(err, Claims){
     payloads = [
       { topic: "mlc-poc-topic", messages: JSONString, partition: 0}
   ];
   producer.send(payloads, function (err, data) {
        console.log('2____',data);
       //  console.log('2_________________');
       //console.log('2_____Message Published to Kafka Producer');
           res.json(data);
    });
    // res.send(data);
  }).catch(next);
});




module.exports = router;