import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import { loginContext } from '../contexts/loginContext';
import { useNavigate } from 'react-router-dom';


function Login() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  let navigate=useNavigate() //Programmatical Navigation to users



  let {register,handleSubmit,formState:{errors}}=useForm()

  let formsubmit=(userobj)=>{      
      console.log(userobj)
      loginUser(userobj)
    
  }

  // re-render the component for evry state change
  useEffect(()=>{
    if(userLoginStatus===true){
      console.log(currentUser.role)
      if(currentUser.role==='student'){
      navigate('/student-profile')}
      else if(currentUser.role==='ngo'){
        navigate('/ngo-profile')
      }
      else if(currentUser.role==='volunteer'){
        navigate('/volunteer-profile')
      }
      else if(currentUser.role==='admin'){
        navigate('/admin-profile')
      }
      else{
        console.log("thjere is error")
      }
    }
  },[userLoginStatus])

  return (
    <div>
        <div className='container-fluid mt-5'>
  
          <h1 className='text-center mb-5 '>Login Portal</h1>
          {
            error.length!==0 && <h1 className='text-danger text-center mt-4'>{error}</h1> 
          }
          <form onSubmit={handleSubmit(formsubmit)}>
  
            <div className='row'>
              <div className='col-11 col-sm-8 col-md-5 mx-auto'>
              
              <div className='mb-3'>
                  <label htmlFor='email' >Email</label>
                  <input type='email' id="email" className='form-control'  {...register("email",{required:true})} />
                  {errors.email?.type==="required" && <p className='text-danger'>*Email is required</p>}
                </div>

                <div className='mb-3'>
                  <label htmlFor='password' >Password</label>
                  <input type='password' id="password" className='form-control'  {...register("password",{required:true})} />
                  {errors.password?.type==="required" && <p className='text-danger'>*Password is required</p>}
                </div>
  
                  
              <button className='btn btn-success' type='submit'>Login</button> 
              </div>
            </div>
             
          </form>
          </div>
      </div>
  )
}

export default Login