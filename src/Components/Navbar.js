import React from 'react'
import {RiDashboardFill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {SiWebmoney, SiDwavesystems} from 'react-icons/si'
import {GiExpense} from 'react-icons/gi'
import { NavLink, Link } from 'react-router-dom'

function Navbar({user, signOut}) {
  return (
    <div className='navbar'>
        <Link  to='/Home' className='logo'><SiDwavesystems/> Fiscall LLC</Link>
        <div className="profile">
          {/* <img src="" alt="profilepic"/> */}
          <span className="img"></span>
          <p>{user}</p>
        </div>
        <div className='links'>
            <NavLink to="dashboard"><RiDashboardFill/> Dashboard</NavLink>
            <NavLink to="profile"><CgProfile/> Profile</NavLink>
            <NavLink to="/"><SiWebmoney/> Income</NavLink>
            <NavLink to="/"><GiExpense/> Expenses</NavLink>
        </div>
        <button className="logout" onClick={signOut}>Log out</button>
    </div>
  )
}

export default Navbar