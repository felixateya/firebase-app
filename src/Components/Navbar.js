import React from 'react'
import {RiDashboardFill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {SiWebmoney, SiDwavesystems} from 'react-icons/si'
import {GiExpense} from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Navbar({user}) {
  return (
    <div className='navbar'>
        <Link className='logo'><SiDwavesystems/> Fiscall LLC</Link>
        <div className="profile">
          {/* <img src="" alt="profilepic"/> */}
          <span className="img"></span>
          <p>{user}</p>
        </div>
        <div className='links'>
            <Link to="/"><RiDashboardFill/> Dashboard</Link>
            <Link to="/"><CgProfile/> Profile</Link>
            <Link to="/"><SiWebmoney/> Income</Link>
            <Link to="/"><GiExpense/> Expenses</Link>
        </div>
    </div>
  )
}

export default Navbar