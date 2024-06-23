const jwt=require("jsonwebtoken")

const verifyToken=(request,response,next)=>{
    // get token
    let bearerToken=request.headers.authorization

    // if token not ther
    if(bearerToken===undefined){
        response.send({message:"Unauthorized user access"})
    }
    else{
        // get token
        let token=bearerToken.split(" ")[1]

        try{
        jwt.verify(token,'abcdef')
        next()
        }
        catch(err){
            response.send({messaage:err})

        }
        // verify
    }
}

module.exports=verifyToken