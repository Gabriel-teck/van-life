import React from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";

const HostVanDetails = () => {
  const param = useParams();
  // OR I CAN DESTRUCTURE IT AND SAY I ONLY CARE ABOUT THE ID PROP {id}
  // const {id} = useParams();
  const [currentVan, setCurrentVan] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/host/vans/${param.id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));
  }, []);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  if (!currentVan) {
    return <h2>Loading......</h2>;
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <aside className="hostdetails-container">
        <div className="hostdetails-list">
          <img src={currentVan.imageUrl} />
          <div className="hostdetails-info">
            <i className={`van-type ${currentVan.type} selected`}>
              {currentVan.type}
            </i>
            <h1>{currentVan.name}</h1>
            <h2>
              ${currentVan.price}
              <span>/day</span>
            </h2>
          </div>
        </div>
        <nav className="van-detail-nav-bar">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            photos
          </NavLink>
        </nav>

        <Outlet context={{ currentVan }} />
      </aside>
    </section>
  );
};

export default HostVanDetails;
