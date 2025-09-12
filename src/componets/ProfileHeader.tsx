// components/profile/ProfileHeader.tsx
import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Business, Place, CalendarMonth } from "@mui/icons-material";
import type { Profile } from "./ProfileCardV1";

const RingAvatar = styled(Avatar)(({ theme }) => ({
  width: 112,
  height: 112,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}));

// demo data – wire in your real data
const MOCK: Profile = {
  DisplayName: "Yannick Daantje",
  FirstName: "Yannick",
  LastName: "Daantje",
  PrimaryEmail: "yannick@example.com",
  Language: "nl-NL",
  JobTitle: "Software Developer",
  Department: "Engineering",
  Company: "Your Company",
  EmployeeId: "EMP-10293",
  ManagerName: "Tippe van Roosmalen",
  ManagerEmail: "tippe@example.com",
  UserPrincipalName: "yannick@example.com",
  City: "Dordrecht",
  Country: "Netherlands",
  StartDateLabel: "Sinds 1 september 2025",
};

export default function ProfileHeader({
  profile,
  coverUrl,
}: {
  profile: Profile;
  coverUrl?: string;
}) {
  return (
    <Card variant="outlined" sx={{ overflow: "hidden", border: 0 }}>
      <Box
        sx={{
          height: 180,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558551649-e44c8f992010?q=80&w=868&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Stack
          sx={{
            position: "relative",
            alignItems: "center",
            mt: -7,
            mb: 1.5,
            gap: 1,
          }}
        >
          <RingAvatar />
          <Typography variant="h6">
            {profile.DisplayName ??
              `${profile.FirstName ?? ""} ${profile.LastName ?? ""}`.trim()}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              gap: { xs: 1, sm: 3 },
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            {profile.JobTitle && (
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <Business fontSize="small" />
                <Typography variant="subtitle2">{profile.JobTitle}</Typography>
              </Stack>
            )}
            {profile.City && (
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <Place fontSize="small" />
                <Typography variant="subtitle2">{profile.City}</Typography>
              </Stack>
            )}
            {profile.StartDateLabel && (
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <CalendarMonth fontSize="small" />
                <Typography variant="subtitle2">
                  {profile.StartDateLabel}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
