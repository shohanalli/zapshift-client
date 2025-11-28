import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxousInstanc from '../../Hooks/useAxousInstanc';

const PaymentDetails = () => {
    const {user} = useAuth();
    const axiousSecure = useAxousInstanc();
    const {data: payments = []} = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async()=>{
            const res = await axiousSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })

    return (
        <div>
            <h2>Total Parcel Order: {payments.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Price</th>
        <th>TransactionID</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
{
    payments.map((payment, index)=>
     <tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.parcelName}</td>
        <td>{payment.amount}</td>
        <td>{payment.transactionId}</td>
      </tr>
    )
}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentDetails;