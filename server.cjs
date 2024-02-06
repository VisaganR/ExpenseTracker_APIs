const express =require('express')
const bodyParser =require('body-parser')
const { ObjectId } = require('mongodb')
//Importing the required functionns from dbCOnnection.cjs
const {connecToDb,getDb} = require('./dbConnection.cjs')


const app=express()
app.use(bodyParser.json())

let db
connecToDb(function(error){
   if(error){
    console.log('Could not establish connection...')
    console.log(error)
   }
else{      //if no error in establishing  connection
    const port=8000
app.listen(port)
db=getDb()
console.log(`Listening on port ${port}...`)
   }
})

// app.get('/',function(request,response){
//     response.json({
//         "status" :"Welcome ;)"
//     })
// })






/*
*******Expense Tracker**********
*Functionalties :adding entry,getting the summaries of previous entries,editing and deleting
*Input fields:Category,Amount,Date
*
*CRUD:Create,Read,Update,Delete
**********************************
*get-entries /get-data-GET
*add-entry:-POST
*edit-entry:-PATCH
*delete-entry:-DELETE
*/

//ADD-via body
app.post('/add-entry',function(request,response){
    db.collection('ExpenseData').insertOne(request.body).then(function(){     //-->insert is the asynocronus function it returns promise
     response.status(200).json({
        "status" : "Entry added successfully"
    
     })
    }).catch(function(){
    response.status(500).json({
    "status" : "Entry not added"
})  
    })    
}) 
//READ-via body
app.get('/get-entries',function(request,response){
    //Declaring an empty array
    const entries=[]
    db.collection('ExpenseData')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(){
        response.status(500).json({
            "status" : "Could not fetch documents"
        })
    })
})


//DELETE  -->via query


app.delete('/delete-entry',function(request,response){
    if(ObjectId.isValid(request.query.id))
    db.collection('ExpenseData').deleteOne({
        _id: new ObjectId(request.query.id)
    }).then(function(){
        response.status(200).json({
            "status" : "Entry successful deleted"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "Entry not deleted"
        })
    })
})


//UPDATE  -->Via params


app.patch('/update-entry/:id',function(request,response){
 // console.log(request.params.id)
 db.collection('ExpenseData').updateOne(
        { _id: new ObjectId(request.params.id) },//identifier :selecting the document which we are goiing to update
        { $set:request.body }   //The data to be updated
    )
    .then(function(){
        response.status(200).json({
            "status" : "Entry updated successfully"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "Unsuccessful on updating the entry"
        })
    })
})



//FINALLY--We going to deploy and host-->ATLAS(For MongoDB)(cloud service)