import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../Component/Sheard/SocialLogin';

const Login = () => {
    const {register, handleSubmit} = useForm()
    const {signInUser} = useAuth()
    const naviget = useNavigate();
    const location = useLocation();

    const handelLogin =(data)=>{
        signInUser(data.email, data.password)
        .then(res=> {
          console.log(res.user)
          naviget(location?.state || '/')
        }
        )
        .catch(err=> console.log(err))
    }
    return (
        <div className=''>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h2 className='text-4xl text-secondary font-semibold text-center pt-5'>Welcome Back</h2>
            <p className='text-center'>Please login</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handelLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        </form>
        <SocialLogin></SocialLogin>
        <Link state={location.state} to={'/register'} className='text-center font-semibold'>Have Not an account? <span className='text-base text-secondary  border-b'>Register</span></Link>
      </div>
    </div>
        </div>
    );
};

export default Login;