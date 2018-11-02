var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClaimSchema = new Schema ({
    Customer_Id:{
       type:String, 
       required:true
        },
     Customer_F_Name:{
       type:String, 
       required:true
        },
   Customer_M_Name:{
       type:String, 
       required:false
        },
    Customer_L_Name:{
       type:String, 
       required:true
        },
    Customer_National_Id:{
       type:String, 
       required:true
        },
    Customer_DOB:{
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
   Policy_Id: {
       type:String,
       required:true
      },
    Policy_Start_DT: {
       type:String,
       required:false
      },
    Policy_End_DT: {
       type:String,
       required:false
      },  
    Claimed_Amount: {
       type:String,
       required:true
      }, 
      Date_of_Claim: {
       type:String,
       required:true
      }
});
const Claims = mongoose.model('Claims', ClaimSchema);
module.exports = Claims;