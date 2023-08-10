import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanpricing = () => {
    const {currentVan} = useOutletContext();
  return (
    <>
      <div>
        <h2  className="host-van-price">${currentVan.price}.00<span>/day</span></h2>
      </div>
    </>
  )
}

export default HostVanpricing
