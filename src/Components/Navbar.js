import React from 'react'
import {RiDashboardFill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {SiWebmoney, SiDwavesystems} from 'react-icons/si'
import {GiExpense} from 'react-icons/gi'

function Navbar({user}) {
  return (
    <div className='navbar'>
        <h3><SiDwavesystems/> Fiscall LLC</h3>
        <div className="profile">
          {/* <img src="" alt="profilepic"/> */}
          <span className="img"></span>
          <p>{user}</p>
        </div>
        <div className='links'>
            <a href="/Home" alt="..."><RiDashboardFill/> Dashboard</a>
            <a href="/Home" alt="..."><CgProfile/> Profile</a>
            <a href="/Home" alt="..."><SiWebmoney/> Income</a>
            <a href="/Home" alt="..."><GiExpense/> Expenses</a>
        </div>
    </div>
  )
}

export default Navbar