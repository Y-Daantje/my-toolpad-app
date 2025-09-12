// src/components/ProfileCardV1Sectioned.tsx
import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Business,
  Place,
  CalendarMonth,
  ContentCopy as CopyIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { styled, SxProps } from "@mui/material/styles";

// —— types (extends your C# model with optional address fields) ——
export type Profile = {
  DisplayName?: string;
  FirstName?: string;
  LastName?: string;
  PrimaryEmail?: string;
  Language?: string;
  JobTitle?: string;
  Department?: string;
  Company?: string;
  EmployeeId?: string;
  City?: string;
  Country?: string;
  ManagerName?: string;
  ManagerEmail?: string;
  TeamsId?: string;
  OneDriveUrl?: string;
  OfficeLocation?: string;
  MobilePhone?: string;
  BusinessPhones?: string;
  UserPrincipalName?: string;
  UserHint?: string;
  StartDateLabel?: string;

  // Zakelijk adres / contact (optional)
  BusinessStreet?: string;
  BusinessPostcode?: string;
  BusinessPlaats?: string;
  BusinessCountry?: string;
  BusinessPhone?: string;

  // Privé adres / contact (optional)
  PrivateStreet?: string;
  PrivatePostcode?: string;
  PrivatePlaats?: string;
  PrivateCountry?: string;
  PrivatePhone?: string;
};

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

  BusinessStreet: "Stationsstraat 1",
  BusinessPostcode: "3011 AB",
  BusinessPlaats: "Rotterdam",
  BusinessCountry: "Netherlands",
  BusinessPhone: "+31 10 123 4567",

  PrivateStreet: "Dorpslaan 22",
  PrivatePostcode: "3311 BC",
  PrivatePlaats: "Dordrecht",
  PrivateCountry: "Netherlands",
  PrivatePhone: "+31 6 12 34 56 78",
};

const RingAvatar = styled(Avatar)(({ theme }) => ({
  width: 112,
  height: 112,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}));

// label-value row (no border)
type FieldRowProps = {
  label: string;
  value?: string;
  link?: string;
  copy?: boolean;
  sx?: SxProps;
};

export function FieldRow({
  label,
  value,
  link,
  copy = true,
  sx,
}: FieldRowProps) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };

  return (
    <Grid
      container
      alignItems="center"
      // tighter vertical rhythm + responsive horizontal spacing
      columnSpacing={{ xs: 0.75, sm: 1.5, md: 2, lg: 2.5 }}
      rowSpacing={{ xs: 0.25, sm: 0 }}
      sx={{ py: 0.3, ...sx }}
    >
      {/* Label stacks on xs; becomes a narrow column on large screens */}
      <Grid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            whiteSpace: { xs: "normal", sm: "nowrap" },
            lineHeight: 1.6,
            pr: { sm: 1 },
          }}
        >
          {label}:
        </Typography>
      </Grid>

      {/* Value uses the remaining space */}
      <Grid size={{ xs: 12, sm: 12, md: 10, lg: 12 }}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          {link && value ? (
            <Typography
              variant="body2"
              component={Link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ flex: 1, wordBreak: "break-word", lineHeight: 1.6 }}
            >
              {value}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ flex: 1, wordBreak: "break-word", lineHeight: 1.6 }}
            >
              {value ?? "—"}
            </Typography>
          )}
          {copy && value && (
            <Tooltip title={copied ? "Gekopieerd!" : "Kopieer"}>
              <IconButton size="small" onClick={onCopy}>
                <CopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

// titled divider
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Stack sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        {children}
      </Typography>
      <Divider />
    </Stack>
  );
}

export default function ProfileCardV1Sectioned({
  coverUrl = "https://images.unsplash.com/photo-1558551649-e44c8f992010?q=80&w=868&auto=format&fit=crop",
  profile = MOCK,
}: {
  coverUrl?: string;
  profile?: Profile;
}) {
  // collapsed by default
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Stack spacing={2}>
      {/* Header: cover + avatar + name + quick meta */}
      <Card sx={{ overflow: "hidden", borderRadius: 3 }}>
        <Box
          sx={{
            height: 180,
            backgroundImage: `url(${coverUrl})`,
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
                  <Typography variant="subtitle2">
                    {profile.JobTitle}
                  </Typography>
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

      {/* Info card */}
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        {/* ALGEMEEN — always visible */}
        <SectionTitle>Algemeen</SectionTitle>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Displayname" value={profile.DisplayName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Emailadres"
              value={profile.PrimaryEmail}
              link={
                profile.PrimaryEmail
                  ? `mailto:${profile.PrimaryEmail}`
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Functie" value={profile.JobTitle} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Afdeling" value={profile.Department} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Manager" value={profile.ManagerName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="ManagerEmail"
              value={profile.ManagerEmail}
              link={
                profile.ManagerEmail
                  ? `mailto:${profile.ManagerEmail}`
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Taal" value={profile.Language} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="EmployeeID" value={profile.EmployeeId} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FieldRow
              label="UserPrincipalName"
              value={profile.UserPrincipalName}
            />
          </Grid>
        </Grid>

        {/* expanded sections */}
        {expanded && (
          <>
            {/* ZAKELIJK */}
            <SectionTitle>Zakelijk</SectionTitle>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow label="Bedrijfsnaam" value={profile.Company} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Telefoon"
                  value={profile.BusinessPhones ?? profile.BusinessPhone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Straatnaam/huisnr"
                  value={profile.BusinessStreet}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FieldRow label="Postcode" value={profile.BusinessPostcode} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FieldRow label="Plaats" value={profile.BusinessPlaats} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Country"
                  value={profile.BusinessCountry ?? profile.Country}
                />
              </Grid>
            </Grid>

            {/* PRIVÉ */}
            <SectionTitle>Privé</SectionTitle>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Telefoon"
                  value={profile.PrivatePhone ?? profile.MobilePhone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Straatnaam + huisnr"
                  value={profile.PrivateStreet}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FieldRow label="Postcode" value={profile.PrivatePostcode} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FieldRow
                  label="Woonplaats"
                  value={profile.PrivatePlaats ?? profile.City}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FieldRow
                  label="Country"
                  value={profile.PrivateCountry ?? profile.Country}
                />
              </Grid>
            </Grid>
          </>
        )}

        {/* bottom separator + expand button */}
        <Divider sx={{ mt: 2, mb: 1.5 }} />
        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            onClick={() => setExpanded((x) => !x)}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transition: "transform .2s",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            }
          >
            {expanded ? "Minder tonen" : "Meer tonen"}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
