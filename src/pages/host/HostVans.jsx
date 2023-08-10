import React from "react";
import { Link } from "react-router-dom";

const HostVans = () => {
  const [vans, setVans] = React.useState([]);

  const getApi = async () => {
    const res = await fetch("/api/host/vans");
    const { vans } = await res.json();
    setVans(vans);
    console.log("api call", vans);
  };

  React.useEffect(() => {
    getApi();
  }, []);

  const getVan = vans.map((van) => {
    const { name, id, price, imageUrl } = van;
    return (
      <Link
        to={`/host/vans/${van.id}`}
        className="host-van-link-wrapper"
        key={id}
      >
        <div key={id} className="hostVan-list">
          <img src={imageUrl} alt={`Photo of ${name}`} />
          <div className="hostvan-info">
            <h1>{name}</h1>
            <p>${price}/day</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <section className="hostVan-container">
        <h1 className="hostvan-h1">Your listed vans</h1>
        {vans.length > 0 ? <div>{getVan}</div> : <h2>Loading....</h2>}
      </section>
    </>
  );
};

export default HostVans;
