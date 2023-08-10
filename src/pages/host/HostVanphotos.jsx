import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanphotos = () => {
    const {currentVan} = useOutletContext();
  return (
    <>
     <div>
        <img src={currentVan.imageUrl} className="host-van-detail-image"/>
     </div>
    </>
  )
}

export default HostVanphotos
