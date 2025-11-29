import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxousInstanc from '../../Hooks/useAxousInstanc';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
// import { data} from 'react-router';
const Myparcel = () => {
    const {user} = useAuth()
    const axiousSecure = useAxousInstanc()
    const {data : parcels = [], refetch} = useQuery({
        queryKey:['Mayparcel', user?.email],
        queryFn: async () =>{
            const res = await axiousSecure.get(`/parcels?email=${user.email}`)
            return res.data
            
        }
    })

    const handelDelete = (id) =>{
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
      axiousSecure.delete(`/parcels/${id}`)
      .then(res=>{
      if(res.data.deletedCount){
    Swal.fire({
      title: "Deleted!",
      text: "Your parcel has been deleted.",
      icon: "success"
    });
    refetch()
        }
  })
  
  }
});
    }

    const handelPayment = async(parcel) =>{
      const paymentInfo = {
        parcelId: parcel._id,
        parcelName: parcel.parcelName,
        senderEmail: parcel.senderEmail,
        cost:parcel.cost,
      }
      const res = await axiousSecure.post('/create-checkout-section', paymentInfo)
      window.location.assign(res.data.url);
      console.log(res.data);
    }


console.log(parcels);

    return (
        <div>
<div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment</th>
        <th>Delivery Status</th>
        <th>Actions</th>

      </tr>
    </thead>
      {
      parcels.map((parcel, index)=>
          <tbody key={index}>
      <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.parcelName}</td>
        <td>{parcel.cost}</td>
        <td>
          {
          parcel.paymentStatus === 'paid' ? <span className='btn btn-sm bg-secondary text-white'>Paid</span> :
           <button onClick={()=>handelPayment(parcel)} className='btn btn-sm bg-red-500'>Pay Now</button>
          }
          </td>
        <td>{parcel.deliveryStatus}</td>
        <td className='space-x-1.5'>
          <button className="btn btn-square hover:bg-primary">
            <FaEdit />
          </button>
          <button className="btn btn-square hover:bg-primary">
            <FaMagnifyingGlass />
          </button>
          <button onClick={()=>handelDelete(parcel._id)} className="btn btn-square hover:bg-primary">
            <FaRegTrashAlt />
          </button>
        </td>

      </tr>

    </tbody>    
    )}

  </table>
</div>
        </div>
    );
};

export default Myparcel;