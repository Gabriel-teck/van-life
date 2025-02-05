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


export const loader = async () => {
  const vansPromise = getVans();
  return defer({ vans: vansPromise });
};

const Vans = () => {
  //making use of a useLoaderData hook instead of useEffect
  const dataPromise = useLoaderData();


  //setting up a search/query parameter
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  console.log(searchParams.toString());



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


