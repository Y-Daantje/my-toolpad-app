import * as React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent } from "react";
import ProfileCardV1Sectioned from "../componets/ProfileCardV1";
import ConnectionsPage from "../componets/connections";
import Notifications, { NotificationPrefs } from "../componets/notification";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AllSettings() {
  function handleChange(
    event: SyntheticEvent<Element, Event>,
    value: any
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <PageContainer>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={1}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={1} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={2} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={3} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </PageContainer>
  );
}
