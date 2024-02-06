const {MongoClient} =require('mongodb')


let dbConnection
function connecToDb(callBack){   //establish funciton
   MongoClient.connect('mongodb+srv://visa:visa@cluster0.ronuqp5.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function(client){    //('CopyStrings in the mongodb /Databasename in the mongodb')
   //console.log(cbConnection)     //promsie 
   dbConnection =client.db() //to access all databases and resolve the promise pending issue.
   callBack()  
}).catch(function(error){
    callBack(error)
})
}
function getDb(){ //getting function
  return dbConnection
}

//Exporting the required functions
module.exports ={connecToDb,getDb}










