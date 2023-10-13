import React from 'react'

function Navbar({user}) {
  return (
    <div className='navbar'>
        <h3>Fiscall LLC</h3>
        <div className="profile">
          {/* <img src="" alt="profilepic"/> */}
          <span className="img"></span>
          <p>{user}</p>
        </div>
        <div className='links'>
            <a href="/Home" alt="...">Dashboard</a>
            <a href="/Home" alt="...">Profile</a>
            <a href="/Home" alt="...">Income</a>
            <a href="/Home" alt="...">Expenses</a>
        </div>
    </div>
  )
}

export default Navbar