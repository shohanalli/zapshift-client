import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
const axousSecure = axios.create({
  baseURL: 'http://localhost:3000',

});
const useAxousInstanc = () => {
  const {user, signOutFunction} = useAuth();
  const naviget = useNavigate()

  console.log(user)
  useEffect(()=>{
      if (!user) return;
      // interceptor request 
    const reqInterCeptor = axousSecure.interceptors.request.use(async(config) =>{
      // const token = await user.getIdToken();
      config.headers.Authorization =`Bearer ${user?.accessToken}`
      return config
    })
    //interceptor response
   const resInterCeptor = axousSecure.interceptors.response.use((response) =>{
    return response;
    },(error)=>{
      const statuscode = error.status;
      if(statuscode === 401 || statuscode === 403){
        signOutFunction()
        .then(()=>{
          naviget('/login')
        })

      }
      return Promise.reject(error)
    })

    return ()=>{
      axousSecure.interceptors.request.eject(reqInterCeptor);
      axousSecure.interceptors.request.eject(resInterCeptor)
    }
  },[user, naviget, signOutFunction])




    return axousSecure
};

export default useAxousInstanc;