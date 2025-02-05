import React from "react";
import { Link, useLocation, useLoaderData } from "react-router-dom";
import { getVan } from "../../api";

export const loader = async ({ params }) => {
  return getVan(params.id);
};

const VanDetail = () => {
  const location = useLocation();
  // console.log(location);
  const van = useLoaderData();

  //we make use of OPTIONAL CHAINING in vanila js
  const search = location.state?.search || "";

  //optional chaining to make the back to all vans use a specified filtered type
  const type = location.state?.type || "all";

 

  return (
    <>
      <section className="detail-container">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr; <span>Back to {type} vans</span>
        </Link>
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
      </section>
    </>
  );
};

export default VanDetail;
