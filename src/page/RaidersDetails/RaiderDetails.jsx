import React from 'react';
import useAxousInstanc from '../../Hooks/useAxousInstanc';
import { useQuery } from '@tanstack/react-query';
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
const RaiderDetails = () => {
    const axiosSecure = useAxousInstanc();

    const {refetch, data : raiders = []} = useQuery({
        queryKey: ['raider', 'pending'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/raiders')
            return res.data
            
        }
    })
    const updateRaiderStatus = (raider, status)=>{
        const updateInfo = {status: status, email: raider.raiderEmail}
        axiosSecure.patch(`/raiders/${raider._id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
            Swal.fire({
                position: "top-end",
                 icon: "success",
                 title: `Raider has been ${status}`,
                showConfirmButton: false,
                 timer: 2000
                });
            }
        })
    }

    const handelAproval = (raider) =>{
        updateRaiderStatus(raider, 'approved')
    }
    const handelRejected = (raider) =>{
        updateRaiderStatus(raider, 'rejected')
    }

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
          axiosSecure.delete(`/raiders/${id}`)
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



    return (
        <div className='p-8'>
          <h2 className='text-2xl text-secondary font-bold'>Raider Details</h2>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Distric</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            raiders.map((raider, index)=>
      <tr>
        <th>{index + 1}</th>
        <td>{raider.raiderName}</td>
        <td>{raider.raiderEmail}</td>
        <td>{raider.raiderDistrict}</td>

        <td>
            {raider.status === 'approved' ?(
            <button className='btn btn-sm bg-secondary text-white'>{raider.status}</button> 
        ): raider.status === 'rejected' ?(
        <button  className='btn btn-sm bg-red-500'>{raider.status}</button>
        ) : <button  className='btn btn-sm bg-primary'>{raider.status}</button>
            }
        </td>
        <td>
        <button onClick={()=>handelAproval(raider)} className='btn btn-sm'>
            <IoMdPersonAdd />
        </button>
        <button onClick={()=>handelRejected(raider)} className='btn btn-sm'>
           <IoPersonRemove />
        </button>
        <button onClick={()=>handelDelete(raider._id)} className='btn btn-sm'>
           <FaTrashAlt />
        </button>
        </td>
      </tr>
            )
        }


    </tbody>
  </table>
</div>
        </div>
    );
};

export default RaiderDetails;