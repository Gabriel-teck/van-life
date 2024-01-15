import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import "./index.css";
import About from "./pages/About";
import Home from "./pages/Home";
import {
  Login,
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard, {loader as dashboardLoader} from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans";
import HostVanDetails, {
  loader as hostVanDetailLoader,
} from "./pages/host/HostVanDetails";
import HostVaninfo from "./pages/host/HostVaninfo";
import HostVanpricing from "./pages/host/HostVanpricing";
import HostVanphotos from "./pages/host/HostVanphotos";
import NotFound from "./pages/NotFound";
import { Error } from "./components/Error";
import { requireAuth } from "./utils";

import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="/login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={dashboardLoader}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />

        <Route
          path="vans/:id"
          element={<HostVanDetails />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVaninfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanpricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanphotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
