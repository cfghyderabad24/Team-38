import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
    let navigate=useNavigate() //Programmatical Navigation to users

    let [error,setErrors]=useState('') //For errror while post request
  
    let {register,handleSubmit,formState:{errors}}=useForm()
  
    let formsubmit=(userobj)=>{      
        console.log(userobj)
      axios.post("http://localhost:4000/user-reg/register-user",userobj)
      .then(response=>{
        if(response.status===201){
          navigate('/login')
        }
        if(response.status!==201){
              setErrors(response.data.message)
            }
      })
      .catch(err=>{
        if(err.response){
          setErrors(err.message)
        }
        else if(err.request){
          setErrors(err.message)
        }
        else{
          setErrors(err.message)
        }
      })
    }
  
    return (
      <div>
        <div className='container-fluid mt-5'>
  
          <h1 className='text-center mb-5 '>Register to Portal</h1>
          {
            error.length!==0 ? <h1 className='text-danger text-center mt-4'>{error}</h1> : 
          
          <form onSubmit={handleSubmit(formsubmit)}>
  
            <div className='row'>
              <div className='col-11 col-sm-8 col-md-5 mx-auto'>
              
                <div className='mb-3'>
                  <label htmlFor='username' >Name</label>
                  <input type='text' id="username" className='form-control' {...register("username",{required:true, minLength: 4, maxLength: 16})} />
                  {errors.username?.type==="required" && <p className='text-danger'>*Name is required</p>}
                  {errors.username?.type==="minLength" && <p className='text-danger'>*Minimum Length is required 4</p>}
                  {errors.username?.type==="maxLength" && <p className='text-danger'>*Maximum Length is required 16</p>}
                </div>
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
  

                
                {/* <div className='mb-3'>
                  <label htmlFor='dob' >Date of Birth</label>
                  <input type='date' id="dob" className='form-control'  {...register("dob",{required:true})} />
                  {errors.dob?.type==="required" && <p className='text-danger'>*Dob is required</p>}
                </div>
  
                <div className='mb-3'>
                  <label htmlFor='userimg' >User Image Url</label>
                  <input type='text' name="userimg" className='form-control'  {...register("userimg",{required:true})} />
                  {errors.userimg?.type==="required" && <p className='text-danger'>*User Image Profile is required</p>}
                </div>  */}
                <div className='mb-3'>
  <label htmlFor='role'>Role</label>
  <select name="role" className='form-control' {...register("role", { required: true })}>
    <option value="">Select Role</option>
    <option value="ngo">NGO</option>
    <option value="volunteer">Volunteer</option>

  </select>
  {errors.role?.type === "required" && <p className='text-danger'>*Role is required</p>}
</div>

                
              <button className='btn btn-success' type='submit'><FaUserPlus /> Register</button> 
              </div>
            </div>
             
          </form>
  }
        </div>
      </div>
    )
}

export default Register