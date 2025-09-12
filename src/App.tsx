import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Outlet } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core/AppProvider";
import {
  Group,
  RocketLaunch,
  Settings,
  Style,
  WifiTethering,
} from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
    segment: "profile",
    title: "Profile",
    icon: <Group />,
    pattern: "profile",
  },
  {
    segment: "preferences",
    title: "preferences",
    icon: <TuneIcon />,
    pattern: "preferences",
  },
  {
    segment: "connections",
    title: "Connections",
    icon: <WifiTethering />,
    pattern: "connections",
  },
  {
    segment: "notification",
    title: "Notificaton",
    icon: <NotificationsIcon />,
    pattern: "notification",
  },
  {
    segment: "SettingsALL",
    title: "Manage",
    icon: <Settings />,
    pattern: "SettingsALL",
  },
];

const BRANDING = {
  title: "Netflex ",
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
