import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVaninfo = () => {
  const {currentVan} = useOutletContext();

  return (
    <>
      <div  className="host-van-detail-info">
        <h4>Name: <span>{currentVan.name}</span></h4>
        <h4>Category: <span>{currentVan.type}</span></h4>
        <h4>Description: <span>{currentVan.description}</span></h4>
        <h4>Visibility: <span>public</span></h4>
      </div>
    </>
  );
};

export default HostVaninfo;
