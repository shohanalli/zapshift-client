import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxousInstanc from '../../Hooks/useAxousInstanc';
// import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const Raider = () => {
     const {handleSubmit, register, watch} = useForm();
      const [resions, setResions] = useState([]);
      const {user} = useAuth();

      const axiosSecure = useAxousInstanc();
    //   const navigate = useNavigate();
          useEffect(()=>{
    axios.get('/warehouses.json')
    .then(res=>{
        setResions(res.data)
    }
    )
    },[])
       const serviceRegion = resions?.map(resion=> resion.region)
          
   const regionDistric = [...new Set(serviceRegion)]
    // console.log( regionDistric)
    const raiderResionValue = watch('raiderRegion')
   const dristicInRegion = (region)=>{
      const resionDistric = resions.filter(r=>r.region === region);
      const dristic = resionDistric.map(d => d.district);
      return dristic

   }

   const handelRaider =(data)=>{
    axiosSecure.post('/raiders', data)
    .then(res=>{
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                 icon: "success",
                 title: "Your Parcel has been saved",
                showConfirmButton: false,
                 timer: 2000
                 });
        }
    })


   }



    return (
        <div className='py-15 px-10'>
            <h2 className='text-4xl text-secondary font-bold'>Be A Raider ?</h2>
           

            <form onSubmit={handleSubmit(handelRaider)}>
                {/* details */}
                <div className='py-8 md:flex gap-10'>
                    {/* raider details */}
                    <fieldset className="fieldset flex-1">
                    <h2 className='text-xl font-bold text-secondary pb-3'>Raider Details</h2>
                    {/* raider name */}
                    <label className="label text-base text-secondary">Raider Name</label>
                    <input type="text" className="input w-full" {...register('raiderName')} defaultValue={user?.displayName} placeholder="Raider Name" />
                    {/* raider email */}
                    <label className="label text-base text-secondary">Raider Email</label>
                    <input type="email" className="input w-full" {...register('raiderEmail')} defaultValue={user?.email}  placeholder="Raider Email" />
                    {/* raider address  */}
                    <label className="label text-base text-secondary mt-3">Raider Address</label>
                    <input type="text" className="input w-full" {...register('raiderAddress')}  placeholder="Raider Address" />
                    {/*raider phone number
                    <label className="label text-base text-secondary mt-3">raider Phone Number</label>
                    <input type="number" className="input w-full" {...register('raiderNumber')}  placeholder="raider Phone Number" />
                        {/* raider Region */}
                    <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Raider Region</label>
                      <select defaultValue="Pick a Region" {...register('raiderRegion')} className="select">
                        <option>Pick a Region</option>
                        {
                            regionDistric.map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>
                        {/* raider district */}
                 <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Raider District</label>
                      <select defaultValue="Pick a district" {...register('raiderDistrict')} className="select">
                        <option>Pick a District</option>
                        {
                            dristicInRegion(raiderResionValue).map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>
                    </fieldset>
                    {/* More Details */}
                    <fieldset className="fieldset flex-1 mt-10 md:mt-0">
                    <h2 className='text-xl font-bold text-secondary pb-3'>More Details</h2>
                    {/* Driving Licence */}
                    <label className="label text-base text-secondary">Driving Licence</label>
                    <input type="text" className="input w-full" {...register('drivingLicence')}  placeholder="Driving Licence" />
                    {/* Bike Info */}
                    <label className="label text-base text-secondary">Bike Info</label>
                    <input type="text" className="input w-full" {...register('bikeInfo')}  placeholder="Bike Information" />
                    {/*NID Number */}
                    <label className="label text-base text-secondary mt-3">NID Number</label>
                    <input type="number" className="input w-full" {...register('nid')}  placeholder="NID Number" />

                    </fieldset>
                </div>
            <label className='btn bg-primary'>
                     <input  type="submit" />
                     Apply as A Raider
            </label>

            </form>
            
        </div>
    );
};

export default Raider;