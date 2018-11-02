var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AddessSchema = new Schema ({
   Address_Id:{
       type:String, 
       required:true
    },
   Address_1: {
       type:String
       },
   Address_2: {
       type:String
       },
   City: {
       type:String
        },
   Zip: {
       type:String
        },
   Province: {
       type:String
        },
   Country: {
       type:String
        },
   Phone_No: {
       type:String
      }
});
const CustAddress = mongoose.model('Address', AddessSchema);
module.exports = CustAddress;