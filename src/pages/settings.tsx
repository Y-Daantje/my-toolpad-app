// settings.tsx
import * as React from "react";
import { Business, CalendarMonth, Place } from "@mui/icons-material";
import { Stack, Card, CardContent, Avatar, Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import SettingsPage from "../data/settingsconnect";

export default function Settings() {
  return (

<PageContainer>
      <SettingsPage />
</PageContainer>
  );
}
