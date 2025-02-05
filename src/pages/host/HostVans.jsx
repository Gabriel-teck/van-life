import React, { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export const loader = async ({ request }) => {
  await requireAuth(request);
  const vansPromise = getHostVans();
  return defer({ vans: vansPromise });
};

const HostVans = () => {
  const dataPromise = useLoaderData();
  

  const renderVanElements = (vans) => {

    const getVan = vans.map((van) => {
      const { name, id, price, imageUrl } = van;
      return (
        <Link to={van.id} className="host-van-link-wrapper" key={id}>
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
    return <div>{getVan}</div>;
  };

  return (
    <>
      <section className="hostVan-container">
        <h1 className="hostvan-h1">Your listed vans</h1>
        <Suspense fallback={<h2>Loading Vans...</h2>}>
          <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
        </Suspense>
      </section>
    </>
  );
};

export default HostVans;
