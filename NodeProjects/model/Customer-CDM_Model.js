var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema ({
   Customer_Id: {
       type:String, 
       required :[true, 'Customer_Id is required']
    },
   Address:{
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
    },
   First_Name: {
       type:String
       },
   Last_Name: {
       type:String
    },
   Gender: {
       type:String
    },
   Date_of_Birth: {
       type:String
    }
});
const CustCDM = mongoose.model('CustomerCDM', CustomerSchema,'CustomerCDM');
module.exports = CustCDM;