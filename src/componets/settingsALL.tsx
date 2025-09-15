// src/pages/settingsALL.tsx
import * as React from "react";
import { Box, Paper, Stack, Tabs, Tab } from "@mui/material";

import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import Connections from "./connections";
import Preferences from "./preferences";

import NotificationSettings, { type NotificationPrefs } from "./notification"; // assumes default export + named type

import { MOCK, type Profile } from "./ProfileCardV1";

function TabPanel({
  value,
  index,
  children,
}: {
  value: "profile" | "connections" | "preferences" | "notifications";
  index: "profile" | "connections" | "preferences" | "notifications";
  children: React.ReactNode;
}) {
  if (value !== index) return null;
  return <Box sx={{ pt: 2 }}>{children}</Box>;
}

export default function SettingsAll() {
  const [tab, setTab] = React.useState<
    "profile" | "connections" | "preferences" | "notifications"
  >("profile");

  // Provide one profile object for both Header & Details.
  // (Replace with your real data source/store.)
  const profile: Profile = {};

  const [notif, setNotif] = React.useState<NotificationPrefs>({
    paymentEmails: true,
    taskReminders: true,
    securityAlerts: true,
    serviceAnnouncements: false,
  });

  return (
    <Stack spacing={2}>
      {/* Header stays above tabs */}
      <ProfileHeader profile={MOCK} />

      <Paper variant="outlined" sx={{ mt: 1, border: 0, overflow: "hidden" }}>
        {/* Tabs bar */}
        <Box
          sx={{
            px: { xs: 1, sm: 2 },
            pt: 1,
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Settings tabs"
          >
            <Tab value="profile" label="Profile" id="tab-profile" />
            <Tab value="connections" label="Connections" id="tab-connections" />
            <Tab value="preferences" label="Preferences" id="tab-preferences" />
            <Tab
              value="notifications"
              label="Notifications"
              id="tab-notifications"
            />
          </Tabs>
        </Box>

        {/* Panels */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <TabPanel value={tab} index="profile">
            <ProfileDetails profile={MOCK} />
          </TabPanel>

          <TabPanel value={tab} index="connections">
            <Connections />
          </TabPanel>

          <TabPanel value={tab} index="preferences">
            <Preferences />
          </TabPanel>

          <TabPanel value={tab} index="notifications">
            <NotificationSettings prefs={notif} onChange={setNotif} />
          </TabPanel>
        </Box>
      </Paper>
    </Stack>
  );
}
