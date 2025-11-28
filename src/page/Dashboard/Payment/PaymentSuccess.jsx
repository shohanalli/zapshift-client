import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxousInstanc from '../../../Hooks/useAxousInstanc';

const PaymentSuccess = () => {
    const [searchParems] = useSearchParams();
    const[paymentInfo, setPaymentInfo] = useState({})
    const sectionId = searchParems.get('session_id')
    const axiousSecure = useAxousInstanc()
    console.log(sectionId)
    useEffect(()=>{
        if(sectionId){
            axiousSecure.patch(`/payment-success?session_id=${sectionId}`)
            .then(res=>{
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId : res.data.trackingId
                })
                console.log(res.data)
            })
        }
    },[sectionId, axiousSecure])

    return (
        <div>
            <h2 className="text-2xl text-secondary font-bold">Payment Successful</h2>
            <h2 className="text-xl text-secondary font-bold">trackingId == <span className='text-blue-500'>{paymentInfo.trackingId}</span></h2>
            <h2 className="text-xl text-secondary font-bold">transactionId == <span className='text-blue-500'>{paymentInfo.transactionId}</span></h2>

        </div>
    );
};

export default PaymentSuccess;