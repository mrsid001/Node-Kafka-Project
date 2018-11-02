const graphql = require('graphql');
const _ = require('lodash');
var CustomerCDM = require('../model/Customer-CDM_Model');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: ( ) => ({
        Customer_Id: { type: GraphQLString },
        Address: {
            Address_Id: {type: GraphQLString },
            Address_1: {type: GraphQLString },
            Address_2: {type: GraphQLString },
            City: {type: GraphQLString },
            Zip: {type: GraphQLString },
            Province: {type: GraphQLString },
            City: {type: GraphQLString },
            Country: {type: GraphQLString },
            Phone_No: {type: GraphQLString }

        },
        First_Name : { type: GraphQLString },
        Last_Name : { type: GraphQLString },
        Gender : { type: GraphQLString },
        Date_of_Birth : { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Customer: {
            type: CustomerType,
            args: { Customer_Id: { type: GraphQLString } },
            resolve(parent, args){
                return Customer.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});