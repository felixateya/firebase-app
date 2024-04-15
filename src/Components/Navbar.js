import React from 'react'
import {RiDashboardFill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {SiWebmoney, SiDwavesystems} from 'react-icons/si'
import {GiExpense} from 'react-icons/gi'
import { NavLink, Link } from 'react-router-dom'

function Navbar({user, signOut}) {
  return (
    <div className='navbar'>
        <Link  to='/' className='logo'><SiDwavesystems/> <p>Fiscall LLC</p></Link>
        
        <div className='links'>
            <NavLink to="/dashboard"><RiDashboardFill/> Dashboard</NavLink>
            <NavLink to="/income"><SiWebmoney/> Income</NavLink>
            <NavLink to="/expenses"><GiExpense/> Expenses</NavLink>
            <NavLink to="/profile"><CgProfile/> Profile</NavLink>
        </div>
        <div className="profile">
          <h5 className="img"> </h5>
          <p>{user}</p>
        </div>
        <button className="logout" onClick={signOut}>Log out</button>
    </div>
  )
}

export default Navbar