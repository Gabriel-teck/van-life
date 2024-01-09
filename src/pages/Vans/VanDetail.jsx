import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import {Link} from 'react-router-dom'

const VanDetail = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  //we make use of OPTIONAL CHAINING in vanila js
  const search = location.state?.search || "";

  //optional chaining to make the back to all vans use a specified filtered type
  const type = location.state?.type || "all";

  const [van, setVan] = useState(null);

  const getVan = async () => {
    const res = await fetch(`/api/vans/${params.id}`);
    const van = await res.json();
    //we have to pass in the previous vans i.e van.vans
    setVan(van.vans);
    console.log("van data", van);
  };

  useEffect(() => {
    getVan();
  }, [params.id]);

  //   useEffect(()=>{
  //       fetch(`/api/vans/${params.id}`)
  //       .then(res => res.json())
  //       .then(data => setVan(data.vans))
  //   },[params.id])

  return (
    <>
      <section className="detail-container">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr; <span>Back to {type} vans</span>
        </Link>
        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} alt={van.name} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2 className="van-name">{van.name}</h2>
            <p className="van-price">
              ${van.price}
              <span>/day</span>
            </p>
            <p className="van-desc">{van.description}</p>
            <button className="detail-btn">rent this van</button>
          </div>
        ) : (
          <h2>Loading....</h2>
        )}
      </section>
    </>
  );
};

export default VanDetail;
