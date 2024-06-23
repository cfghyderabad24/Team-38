const exp=require('express')
const userregapp=exp.Router()

const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const verifyToken=require('./middlewares/verifytoken')

userregapp.use(exp.json())


// private route
userregapp.get('/get-user',expressAsyncHandler(async(request,response)=>{
    // collection
    const userregistration=request.app.get('userregistration')
    let users=await userregistration.find().toArray()
    response.status(200).send({message:"Users",payload:users})

}))

// public route
userregapp.post('/register-user',expressAsyncHandler(async(request,response)=>{
    // get user
    const newuser=request.body

    // collection
    const userregistration=request.app.get('userregistration')

    const userObj=await userregistration.findOne({username:newuser.username})
    if(userObj!==null){
        // if user existed
        response.status(200).send({message:"User already existed"})
    }
    else{
        // hash the password
    let hashedpwd=await bcryptjs.hash(newuser.password,6)

    // replace plain pwd with hased pwd
    newuser.password=hashedpwd
    await userregistration.insertOne(newuser)
    response.status(201).send({message:"inserted successfully"})
    } 
}))


// pubic route
userregapp.post('/login-user',expressAsyncHandler(async(request,response)=>{
    const userCredentials=request.body
    // collection
    const userregistration=request.app.get('userregistration')

    let userObj=await userregistration.findOne({email:userCredentials.email})
    
    if(userObj===null){
        
        response.status(200).send({message:"Invalid User"})
    }
    else{
        // if username is valid
        // comapare passwords
        let isEqual=await bcryptjs.compare(userCredentials.password,userObj.password)
        if(isEqual===false){
            response.status(200).send({message:"Invalid password"})            
        }
        else{
            let signedjwt=jwt.sign({email:userObj.email},'abcdef',{expiresIn:100})
            response.status(200).send({message:"sucess",token:signedjwt,user:userObj})
        }
    }

}))


// private route
userregapp.delete('/delete-user/:name',expressAsyncHandler(async(request,response)=>{
    // collection
    const userregistration=request.app.get('userregistration')

    const name=request.params.name
     await userregistration.deleteOne({username:name})
     
    response.status(200).send("Deleted succcesfully")

}))


// test ruote private route
userregapp.get('/test',verifyToken,expressAsyncHandler(async(request,response)=>{
    response.send({message:"Reply from protected route"})
}))

module.exports=userregapp