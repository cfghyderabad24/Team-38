const exp=require('express')
const userapp=exp.Router()


const ExpressAsyncHandler=require('express-async-handler')
userapp.use(exp.json())

// get user
userapp.get('/get-user',ExpressAsyncHandler(async(request,response)=>{
    const ashusers=request.app.get('ashusers')
    let users=await ashusers.find().toArray()
    response.status(200).send({message:"Users",payload:users})

    // .then(users=>response.status(200).send({message:"Users",payload:users}))
    // .catch(err=>{
    //     console.log(err)
    //     response.send({message:"error",reason:err.message})
    // })
    

}))

// get user by id
userapp.get('/get-user/:username',ExpressAsyncHandler(async(request,response)=>{
    const ashusers=request.app.get('ashusers')
    let username=request.params.userid
    await ashusers.findOne({username:username})
    response.status(200).send({message:"Users",payload:user})

    // .then(user=>response.status(200).send({message:"Users",payload:user}))
    // .catch(err=>{
    //     console.log(err)
    //     response.send({message:"error",reason:err.message})
    // })
}))
 
// create new user
userapp.post('/register-user',ExpressAsyncHandler(async(request,response)=>{
    // request contains expresss obj-> app-> app.get
    const ashusers=request.app.get('ashusers')
    // get user from client
    const newuser=request.body
    // add user to collection
    await ashusers.insertOne(newuser)
    response.status(201).send("Inserted succcesfully")

    
    // .then(dbRef=>response.status(201).send("Inserted succcesfully"))
    // .catch(err=>{
    //     console.log(err)
    //     response.send({message:"error",reason:err.message})
    // })

}))

// update user
userapp.put('/update-user',ExpressAsyncHandler(async(request,response)=>{
    const ashusers=request.app.get('ashusers')
    let modifieduser=request.body
    await ashusers.updateOne({username:modifieduser.username},{$set:{...modifieduser}})
    response.status(200).send("Updates succcesfully")

    // .then(dbRef=>response.status(200).send("Updates succcesfully"))
    // .catch(err=>{
    //     console.log(err)
    //     response.send({message:"error",reason:err.message})
    // })

}))


// dellete user
userapp.delete('/delete-user/:username',ExpressAsyncHandler(async(request,response)=>{
    const ashusers=request.app.get('ashusers')
    let username=request.params.username
    await ashusers.deleteOne({username:username})
    response.status(200).send("Deleted succcesfully")

    // .then(dbRef=>response.status(200).send("Deleted succcesfully"))
    // .catch(err=>{
    //     console.log(err)
    //     response.send({message:"error",reason:err.message})
    // })

}))
 




module.exports=userapp


// in request.http
// GET http://localhost:4000/user-api/get-user

// ###
// GET http://localhost:4000/user-api/get-user/ash


// ###
// POST http://localhost:4000/user-api/register-user
// Content-Type: application/json

// {
//     "username":"tab",
//     "age":20,
//     "clg":"vnrvjiet"
// }

// ###
// PUT http://localhost:4000/user-api/update-user
// Content-Type: application/json

// {
//     "username":"ash",
//     "age":21,
//     "clg":"vnrvjiet"
// }

// ###
// DELETE http://localhost:4000/user-api/delete-user/tab