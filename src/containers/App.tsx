import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navigation from "./../components/Navigation";
import "./App.css";
import Home from "./Home";

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <div className={"App-body"}>
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
