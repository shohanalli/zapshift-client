import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../Component/Sheard/SocialLogin';
import axios from 'axios';
import useAxousInstanc from '../../Hooks/useAxousInstanc';

const Ragister = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {createUser, updateUserProfile} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxousInstanc() 
    const handelRegisterFrom = (data) =>{
      const profileImg = data.photo[0];

        // console.log(data)
        createUser(data.email, data.password)
        .then(() =>{
            //store photo data
          
          const formData = new FormData()
          formData.append('image', profileImg)
          // send image and create link
          const img_API_URL_LINK = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imageurl}`
          axios.post(img_API_URL_LINK, formData)
          .then(res=>{
            const photoURL =  res.data.data.url
            const userInfo ={
              email: res.data.email,
              displayName: res.data.name,
               photoURL: photoURL
            }
            axiosSecure.post('/users', userInfo)
            .then(res=>{
              if(res.data.insertedId){
                console.log("user data send successful in database");
              }
            })
          // update profile
          const updateProfile = {
            photoURL:  res.data.data.url,
           displayName: data.name
          }
          updateUserProfile(updateProfile)
          .then(()=>{
            navigate(location?.state || '/');
            console.log("update profile done")
          })
          .catch(err=>console.log(err))
          })



    })
         
        .catch(err=>console.log(err))
    }
    return (

<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className='card-body'>
                <h2 className='text-4xl text-secondary font-semibold text-center pt-5'>Create a Account</h2>
            <form onSubmit={handleSubmit(handelRegisterFrom)}>
        <fieldset className="fieldset">
          {/* photo */}
         
           <label className="label" >Your Photo</label>
          <input type="file" className="file-input" placeholder="chose photo" {...register('photo', {required: true})}/>
          {/* name  */}
           <label className="label" >Name</label>
          <input type="text" className="input" placeholder="Full name" {...register('name', {required: true})}/>
          {/* email */}
          <label className="label" >Email</label>
          <input type="email" className="input" placeholder="Email" {...register('email', {required: true})}/>
          {errors.email?.type === 'required' && <span className='text-red-700'>Must be needed</span>}
          {/* password */}
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" {...register('password',{
            required: true,
            minLength: 6,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
          })} />
          {
            errors.password?.type === 'require' && <p className='text-red-700'>Must be need</p>
          }
            {errors.password?.type === 'minLength' && <p className='text-red-700'>Must be need 6 carecter</p>
          }
          {
            errors.password?.type==='pattern' && <p className='text-red-800'>Your password is not strong</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
            </form>
<SocialLogin></SocialLogin>
            <Link state={location.state} to={'/login'} className='text-center font-semibold'>already have an account? <span className='text-base text-secondary  border-b'>Login</span></Link>
        </div>
</div>
    );
};

export default Ragister;