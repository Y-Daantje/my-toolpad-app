import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./layouts/dashboard";
import DashboardPage from "./pages";
import EmployeesCrudPage from "./pages/employees";
import ListPage from "./pages/list";
import CardsPage from "./pages/cards";
import Connections from "./pages/connections";
import Settings from "./pages/settings";
import profile from "./pages/profile";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: DashboardPage,
          },
          {
            path: "employees/:employeeId?/*",
            Component: EmployeesCrudPage,
          },
          {
            path: "list/:listId?/*",
            Component: ListPage,
          },
          {
            path: "cards",
            Component: CardsPage,
          },
            {
            path: "profile",
            Component: profile,
          },
          {
            path: "settings",
            Component: Settings,
          },
          {
            path: "connections",
            Component: Connections,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
