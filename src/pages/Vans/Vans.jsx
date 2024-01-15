import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

// const url = "/api/vans";

export const loader = async () => {
  const vansPromise = getVans();
  return defer({ vans: vansPromise });
};

const Vans = () => {
  //making use of a useLoaderData hook instead of useEffect
  const dataPromise = useLoaderData();

  //setting up a useState hook
  // const [error, setError] = useState(null);
  // const [vans, setVans] = useState([]);
  // const [loading, setLoading] = useState(false);

  //useEffect hook
  // const getData = async () => {
  //   const response = await fetch(url);
  //   const { vans } = await response.json();
  //   setVans(vans);
  //   console.log("my data", vans);
  // };

  //calling the useEffect from a seperate file
  // useEffect(() => {
  //   const loadVans = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getVans();
  //       setVans(data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadVans();
  // }, []);

  //setting up a search/query parameter
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  //console.log(typeFilter);
  console.log(searchParams.toString());

  // if (loading) {
  //   return <h1>Loading....</h1>;
  // }

  // if (error) {
  //   return <h1>There was an error: {error.message}</h1>;
  // }

  const renderVanElement = (vans) => {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "simple" })}
          >
            Simple
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            Luxury
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </button>

          {typeFilter ? (
            <button
              className="van-type clear-filters"
              onClick={() => setSearchParams({})}
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="van-list">
          {displayedVans.map((van) => {
            const { name, id, description, type, price, imageUrl } = van;
            return (
              <div key={id} className="van-title">
                <Link
                  to={van.id}
                  state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter,
                  }}
                  aria-label={`view details for ${van.name},
                                      priced at $${van.price} per day`}
                >
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
        ;
      </>
    );
  };

  return (
    <>
      <article className="van-list-container">
        <h1>Explore our van options</h1>
        <Suspense fallback={<div className="loader"></div>}>
          <Await resolve={dataPromise.vans}>{renderVanElement}</Await>
        </Suspense>
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
