import React from "react";
import { Link, defer, Await, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import { BsStarFill } from "react-icons/bs";

export async function loader({ request }) {
  const authResponse = await requireAuth(request);
  if (authResponse) {
    console.log(authResponse);
    return authResponse;
  }
  return defer({ vans: getHostVans() });
}

export default function Dashboard() {
  const loaderData = useLoaderData();

  const user = localStorage.getItem("user");
  const objUser = JSON.parse(user);

  const renderVanElements = (vans) => {
    const getVan = vans.map((van) => {
      const { name, id, price, imageUrl } = van;
      return (
        <Link to={`vans/${van.id}`} className="host-van-link-wrapper" key={id}>
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
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome {objUser.firstname}</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        <React.Suspense fallback={<div className="loader"></div>}>
          <Await resolve={loaderData.vans}>{renderVanElements}</Await>
        </React.Suspense>
      </section>
    </>
  );
}
