import React from 'react';
import { useParams } from 'react-router';
import useAxousInstanc from '../../../Hooks/useAxousInstanc';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const {parcelId} = useParams();
    const axousSecure = useAxousInstanc()
    const { isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () =>{
            const res = await axousSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if(isLoading){
        <h3>Loading.....</h3>
    }



    return (
        <div>
            <h2>Parcel Name : {parcel.parcelName}</h2>
        </div>
    );
};

export default Payment;