import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary">Payment Cancel</h2>
            <Link to={'/dashboard/my-parcel'}><button className='btn btn-primary text-secondary'>Go Back</button></Link>
        </div>
    );
};

export default PaymentCancel;