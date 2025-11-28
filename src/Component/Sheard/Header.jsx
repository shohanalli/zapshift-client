import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Myparcel from '../../page/Dashboard/Myparcel';

const Header = () => {
  const {user, signOutFunction} = useAuth()
const handleSignOut = () => {
  signOutFunction()
    .then(() => {
      console.log("Sign out successful");
    })
    .catch(err => {
      console.log(err);
    });
};
  const link = <>
  <li><NavLink to={"/"}>Home</NavLink></li>
  <li><NavLink to={'/about'}>about</NavLink></li>
  <li><NavLink to={"/coverage"}>Coverag</NavLink></li>
  <li><NavLink to={"/send-parcel"}>Send a parcel</NavLink></li>
  {
    user && <NavLink to={'dashboard/my-parcel'}>My Parcel</NavLink>
  }
  </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm mb-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {link}
      </ul>
    </div>
    <Logo className="btn btn-ghost text-xl"></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-base font-semibold navlink">
{link}
    </ul>
  </div>
  <div className="navbar-end">
    {user?<Link onClick={handleSignOut} className="btn">Sign Out</Link> : <Link to={'/login'} className="btn">Sign In</Link>}
    <Link to={'/raider'} className='bg-primary text-black py-2 px-5 rounded-4xl'>Be A Rider</Link>
  </div>
</div>
        </div>
    );
};

export default Header;