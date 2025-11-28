import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const axousSecure = axios.create({
  baseURL: 'http://localhost:3000',

});
const useAxousInstanc = () => {
  const {user} = useAuth();

  console.log(user)
  useEffect(()=>{
      if (!user) return;
    axousSecure.interceptors.request.use(async(config) =>{
      const token = await user.getIdToken();
      config.headers.Authorization =`Bearer ${token}`
      return config
    })
  },[user])




    return axousSecure
};

export default useAxousInstanc;