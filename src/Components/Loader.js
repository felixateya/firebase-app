import React from 'react'

function Loader({style}) {
  return (
    <div style={style} className="loader">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
  )
}

export default Loader