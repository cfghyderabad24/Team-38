const exp=require('express')
const app=exp()

app.listen(4000,()=>console.log("port listening on 4000"))


const path=require("path")
app.use(exp.static(path.join(__dirname,'./build')))

// mongodb
const mclient=require('mongodb').MongoClient
mclient.connect('mongodb://localhost:27017')
.then(dbREf=>{
    console.log("server in mongodb");

    // get database
    let dbObj=dbREf.db('ashdb')
    // create collection
    let dbc=dbObj.collection("userregistration")

    // share collections with api->storing express
    app.set("userregistration",dbc)


    // dbc.insertOne({ name: "Ash", age: 30 })
    // .then(result => {
    //     console.log("Document inserted", result);
    // })
    // .catch(err => console.log(err));
}
)
.catch(err=>console.log(err))

// import userapi
// const userApp=require('./API/userApi')
const userReg=require('./API/userregisterApi.js')

// forward request to userapi url starts with user-api
// app.use('/user-api',userApp)
app.use('/user-reg',userReg)



// middlware-> to refresh page
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}

app.use('/*',pageRefresh)

// create a middleware to handle invalid path
const invalidPathHAndler=(request,response,next)=>{
    response.send({"message":"invalid path"})
}
app.use(invalidPathHAndler)

// error handling middleware
const errhandler=(error,request,response,next)=>{
    response.send({"error-message":error.message})
}
app.use(errhandler)