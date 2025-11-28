import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxousInstanc from '../../Hooks/useAxousInstanc';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';


const SendParcel = () => {
    const {handleSubmit, register, watch} = useForm();
    const [resions, setResions] = useState([]);
    const {user} = useAuth();
    const axiosSecure = useAxousInstanc();
    const navigate = useNavigate();
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
    const senderResionValue = watch('senderRegion')
    const receiverResionValue = watch('receiverRegion')
   const dristicInRegion = (region)=>{
      const resionDistric = resions.filter(r=>r.region === region);
      const dristic = resionDistric.map(d => d.district);
      return dristic

   }





    const handelFrom =(data)=>{
        // console.log(data)
        const isDocument = data.document === 'Document';
        const percelWeight = parseFloat(data.parcelWeight);
        const isDistrict = data.senderDistrict === data.receiverDistrict;

        let cost = 0;
        if(isDocument){
            cost = isDistrict? 60 : 80;
        }
        else{
            if(percelWeight <= 3){
                cost = isDistrict? 110 : 150;
            }
            else{
               const legalCost = isDistrict? 110 : 150;
                const extraWeight = percelWeight - 3;
                const extraWeightCost = isDistrict? extraWeight * 40 : (extraWeight * 40) + 40;
                cost = legalCost + extraWeightCost;  
            }
        }
        data.cost = cost;
        Swal.fire({
            title: "Agree with this cost?",
            text: `Your cost will be ${cost} Taka !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#03373D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
            }).then((result) => {
            if (result.isConfirmed) {
                
                axiosSecure.post('/parcels', data)
                .then(res => {
                    if(res.data.insertedId){
                        navigate('/dashboard/my-parcel')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Parcel has been saved",
                            showConfirmButton: false,
                            timer: 2000
                            });
                    }
                    console.log('afetr seving data', res)
                })
            }
            });

    }
    return (
        <div className='py-15 px-10'>
            <h2 className='text-4xl text-secondary font-bold'>Send A Parcel</h2>
            <p className="text-xl font-semibold text-secondary py-3">Enter your parcel details</p>

            <form onSubmit={handleSubmit(handelFrom)}>
                {/* radio button document or non document */}
                <div className='py-5'>
                    <label className='mr-4'>
                       <input  type="radio" name="radio-4" {...register('document')} className="radio radio-secondary mx-2" value={'Document'} defaultChecked />  
                       document
                    </label>
                    <label>
                       <input type="radio" value={'Non-Document'} name="radio-4" {...register('document')}  className="radio radio-secondary mx-2"  />  
                       Non-document
                    </label>
                
                
                </div>
                {/* name and weight */}
                <div className='md:flex border-b border-black/20 pb-8 md:gap-15 gap-8'>
                    <fieldset className="fieldset flex-1">
                    <label className="label text-base text-secondary">Parcel Name</label>
                    <input type="text" className="input w-full" {...register('parcelName')} placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset flex-1">
                    <label className="label text-base text-secondary">Parcel Weight KG</label>
                    <input type="number" className="input w-full" {...register('parcelWeight')}  placeholder="Parcel Weight " />
                    </fieldset>

                </div>
                {/* details */}
                <div className='py-8 md:flex gap-10'>
                    {/* sender details */}
                    <fieldset className="fieldset flex-1">
                    <h2 className='text-xl font-bold text-secondary pb-3'>Sender Details</h2>
                    {/* sender name */}
                    <label className="label text-base text-secondary">Sender Name</label>
                    <input type="text" className="input w-full" {...register('senderName')} defaultValue={user?.displayName} placeholder="Sender Name" />
                    {/* sender email */}
                    <label className="label text-base text-secondary">Sender Email</label>
                    <input type="email" className="input w-full" {...register('senderEmail')} defaultValue={user?.email}  placeholder="Sender Email" />
                    {/*sender address 
                    <label className="label text-base text-secondary mt-3">Sender Address</label>
                    <input type="text" className="input w-full" {...register('senderAddress')}  placeholder="Sender Address" />*/}
                    {/*sender phone number */}
                    <label className="label text-base text-secondary mt-3">Sender Phone Number</label>
                    <input type="number" className="input w-full" {...register('SenderNumber')}  placeholder="Sender Phone Number" />
                        {/* sender Region */}
                    <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Sender Region</label>
                      <select defaultValue="Pick a Region" {...register('senderRegion')} className="select">
                        <option>Pick a Region</option>
                        {
                            regionDistric.map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>
                        {/* sender district */}
                 <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Sender District</label>
                      <select defaultValue="Pick a district" {...register('senderDistrict')} className="select">
                        <option>Pick a District</option>
                        {
                            dristicInRegion(senderResionValue).map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>

                    {/* pickup instruction */}
                    <label className="label text-base text-secondary mt-3">Pickup instruction</label>
                      <textarea 
                        className="textarea textarea-bordered w-full h-15"
                        placeholder="Write parcel details..."
                        {...register("senderPickupInstruction")}
                    ></textarea>
                    </fieldset>
                    {/* Receiverdetails */}
                    <fieldset className="fieldset flex-1 mt-10 md:mt-0">
                    <h2 className='text-xl font-bold text-secondary pb-3'>Receiver Details</h2>
                    {/* Receiver name */}
                    <label className="label text-base text-secondary">Receiver Name</label>
                    <input type="text" className="input w-full" {...register('receiverName')}  placeholder="Receiver Name" />
                    {/* Receiver email */}
                    <label className="label text-base text-secondary">Receiver Email</label>
                    <input type="email" className="input w-full" {...register('receiverEmail')}  placeholder="Receiver Email" />
                    {/* address 
                    <label className="label text-base text-secondary mt-3">Receiver Address</label>
                    <input type="text" className="input w-full" {...register('receiverAddress')}  placeholder="Receiver Address" />*/}
                    {/*Receiver phone number */}
                    <label className="label text-base text-secondary mt-3">Receiver Phone Number</label>
                    <input type="number" className="input w-full" {...register('receiverNumber')}  placeholder="Receiver Phone Number" />

                        {/* Receiver Region */}
                    <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Receiver Region</label>
                      <select defaultValue="Pick a Region" {...register('receiverRegion')} className="select">
                        <option>Pick a Region</option>
                        {
                            regionDistric.map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>
                    {/* receiver district */}
                 <fieldset className="fieldset">
                    <label className="label text-base text-secondary mt-3">Receiver District</label>
                      <select defaultValue="Pick a district" {...register('receiverDistrict')} className="select">
                        <option>Pick a District</option>
                        {
                            dristicInRegion(receiverResionValue).map((region,i)=><option key={i} value={region}>{region}</option>)
                        }
                    </select>
                    </fieldset>


                    {/* pickup instruction */}
                    <label className="label text-base text-secondary mt-3">Receiver Pickup instruction</label>
                      <textarea 
                        className="textarea textarea-bordered w-full h-15"
                        placeholder="Write parcel details..."
                        {...register("receiverPickupInstruction")}
                    ></textarea>
                    </fieldset>
                </div>
            <label className='btn bg-primary'>
                     <input  type="submit" />
                     Proceed to Confirm Booking
            </label>

            </form>
            
        </div>
    );
};

export default SendParcel;