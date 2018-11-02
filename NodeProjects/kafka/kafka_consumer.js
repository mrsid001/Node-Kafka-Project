var kafka = require('kafka-node');
var CustomerSOR = require('../model/Customer-SOR_Model');
var mysql = require('mysql');

var conn = mysql.createConnection({
host: "localhost",
user: "root",
password:"root",
database:"Claim"
});
const client = new kafka.Client();
const topics = [
    {
        topic: "mlc-poc-topic",
        partition: 0
    }
];
const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    fromOffset: "latest",
    encoding: "utf-8"
};

const Consumer = new kafka.Consumer(client, topics, options);
var offset = new kafka.Offset(client);    
   
Consumer.on('ready', function () {
    console.log('Kafka Consumer is ready');
});

Consumer.on('error', function (err) {
    console.log('Kafka Consumer is in error state');
    console.log(err);
});

/*offset.fetch([{ topic: 'node-topic', partition: 0, time: -1 }], function (err, data) {
        var latestOffset = data['node-topic']['0'][0];
        console.log("Consumer current offset: " + latestOffset);
});
*/
Consumer.on('message', function (message) {
     //console.log('3_________________');
      console.log('3_____',message.value);
    var parsedData = JSON.parse(message.value);
  //  var JSONString = JSON.stringify(parsedData);
/*    CustomerSOR.create(parsedData, function (err, DataSOR) {
  if (err) console.log(err);
  console.log(DataSOR);
});
*/
console.log(parsedData);
console.log(parsedData.Customer_Id);

conn.connect(function(err){
if(err) console.log("Error in connecting database");
conn.query("select * from Customers",function(err, result){
if(err) console.log(err);
console.log(result);
});

});




//CustomerSOR.findOneAndUpdate({Customer_Id:parsedData.Customer_Id},parsedData,{upsert:true},function(err, CustomerCDM){
  // CustomerSOR.findOneAndUpdate({Customer_Id:parsedData.Customer_Id},message.value).then(function(CustomerSOR){

 /*  Customer.findOneAndUpdate(
    {_id:parsedData._id}, // find a document with that filter
     message.value, // document to insert when nothing was found
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
        if (err) {
            console.log(err);
             handle error
        } else {
         handle document
            console.log('Customer Update 2nd time');
        } */
//console.log('Updated SOR Table');    
//});
});

 


