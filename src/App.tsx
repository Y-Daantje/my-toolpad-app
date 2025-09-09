import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core/AppProvider";
import { RocketLaunch, Style } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "employees",
    title: "Employees",
    icon: <PersonIcon />,
    pattern: "employees{/:employeeId}*",
  },
  {
    segment: "list",
    title: "list",
    icon: <RocketLaunch />,
    pattern: "list{/:listId}*",
  },
  {
    segment: "cards",
    title: "Cards",
    icon: <Style />,
    pattern: "cards",
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <TuneIcon />,
    pattern: "settings",
  },
];

const BRANDING = {
  title: "Netflex Demo Dashboard",
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
