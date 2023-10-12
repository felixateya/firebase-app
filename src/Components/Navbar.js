import React from 'react'

function Navbar({user}) {
  return (
    <div className='navbar'>
        <h3>{user}</h3>
        <div className='links'>
            <a href="/Home" alt="...">Home</a>
            <a href="/Home" alt="...">Affiliates</a>
            <a href="/Home" alt="...">Contact</a>
        </div>
    </div>
  )
}

export default Navbar