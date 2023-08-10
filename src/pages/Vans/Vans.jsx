import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "/api/vans";

const Vans = () => {
  const [vans, setVans] = useState([]);

  const getData = async () => {
    const response = await fetch(url);
    const { vans } = await response.json();
    setVans(vans);
    console.log("my data", vans);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <article className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list">
          {vans.map((van) => {
            const { name, id, description, type, price, imageUrl } = van;
            return (
              <div key={id} className="van-title">
                <Link to={`/vans/${van.id}`}>
                  <img className="van-img" src={imageUrl} alt={name} />
                  <div className="van-info">
                    <h1>{name}</h1>
                    <h2 className="price">
                      ${price}
                      <span className="span">/day</span>
                    </h2>
                  </div>
                  <i className={`van-type ${type} selected`}>{type}</i>
                </Link>
              </div>
            );
          })}
        </div>
      </article>
    </>
  );
};

export default Vans;

// export default function Vans() {
//   const [vans, setVans] = React.useState([]);
//   React.useEffect(() => {
//     fetch("/api/vans")
//       .then((res) => res.json())
//       .then((data) => setVans(data.vans));
//   }, []);

//   const vanElement = vans.map((van) => (
//     <div key={van.id} className="van-title">
//       <img src={van.imageUrl} />
//       <div className="van-info">
//         <h2>{van.name}</h2>
//         <h2>
//           ${van.price}
//           <span className="price-day">/day</span>
//         </h2>
//       </div>
//       <i className={`van-type ${van.type} selected`}>{van.type}</i>
//     </div>
//   ));

//   return (
//     <div className="van-list-container">
//       <h1>Explore our van options</h1>
//       <div className="van-list">{vanElement}</div>
//     </div>
//   );
// }
