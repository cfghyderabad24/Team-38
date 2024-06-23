import React, { useState } from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'

function UserLoginContextStore({children}) {
    let [currentUser,setCurrentUser]=useState({})
    let [error,setError]=useState("")
    let [userLoginStatus,setUserLoginStatus]=useState(false)

    const loginUser=(userObj)=>{
        axios.post('http://localhost:4000/user-reg/login-user',userObj)
        .then(response=>{
            
            if(response.data.message==="sucess"){
                // login success
                // update user
                setCurrentUser({...response.data.user})
                // set login status
                setUserLoginStatus(true)

                // update error status
                setError("")

                // browser sstorage-> appplication--> local storage or session storage->> key value pair
                localStorage.setItem("token",response.data.token)

            }
            else{
                // login fail
                setError(response.data.message)
            }
        }

        )
        .catch(err=>console.log(err))
    }

    const logoutUser=()=>{
        // clear session or local storage
        localStorage.clear()
         // set login status
         setUserLoginStatus(false)
    }

  return (
    <div>
        <loginContext.Provider value={[currentUser,error,userLoginStatus,loginUser,logoutUser]}>
            {children}
        </loginContext.Provider>
    </div>
  )
}

export default UserLoginContextStore