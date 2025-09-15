import * as React from "react";
import {
  Paper,
  Divider,
  Box,
  Button,
  Stack,
  Typography,
  Icon,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FieldRow } from "./ProfileCardV1";
import type { Profile } from "./ProfileCardV1";
import EmailIcon from "@mui/icons-material/Email";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TranslateIcon from "@mui/icons-material/Translate";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HomeIcon from "@mui/icons-material/Home";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";

export default function ProfileDetails({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Paper variant="outlined" sx={{ border: 0, pt:1 }}>
      <Typography variant="h4" sx={{pb:1}}>
        Contact information
      </Typography>
      <Divider />

      {/* ALGEMEEN — always visible */}
      <Typography variant="h6" sx={{ py: 1.5 }}>
        General
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="E-mail"
            value={
              <Stack direction="row" sx={{ gap: 0.5 }}>
                <EmailIcon fontSize="medium" sx={{ pr: 0.5 }} />
                {profile.PrimaryEmail}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="Function"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <WorkOutlineIcon fontSize="medium" />
                {profile.JobTitle}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="Department"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <CorporateFareIcon fontSize="medium" />
                {profile.Department}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="Manager"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <SupervisorAccountIcon fontSize="medium" />
                {profile.ManagerName}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="ManagerEmail"
            value={
              <Stack direction="row" sx={{ gap: 0.5 }} alignItems="center">
                <Typography
                  component="span"
                  sx={{
                    color: "text.primary", // normal text color
                    transition: "color 0.2s",
                    "&:hover": {
                      color: "primary.main", // only change on hover
                      textDecoration: "underline", // optional
                    },
                  }}
                >
                  <AlternateEmailIcon fontSize="medium" />
                  {profile.ManagerEmail}
                </Typography>
              </Stack>
            }
            link={
              profile.ManagerEmail
                ? `mailto:${profile.ManagerEmail}`
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="Language"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <TranslateIcon fontSize="medium" />
                {profile.Language}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="EmployeeID"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <BadgeIcon fontSize="medium" />
                {profile.EmployeeId}
              </Stack>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="UserPrincipalName"
            value={
              <Stack
                direction="row"
                sx={{ gap: 0.5 }}
                spacing={1}
                alignItems="center"
              >
                <AlternateEmailIcon fontSize="medium" />
                {profile.UserPrincipalName}
              </Stack>
            }
          />
        </Grid>
      </Grid>

      {/* Expanded sections with animation */}
      <Collapse
        in={expanded}
        timeout={{ enter: 600, exit: 450 }}
        unmountOnExit
        mountOnEnter
      >
        {/* ZAKELIJK */}
        <Divider />
        <Typography variant="h6" sx={{ py: 1.5 }}>
          Work
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Company-name"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <BusinessIcon fontSize="medium" />
                  {profile.Company}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Telephone"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <PhoneIcon fontSize="medium" />
                  {profile.BusinessPhones ?? profile.BusinessPhone}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Street name/house number"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <HomeWorkIcon fontSize="medium" />
                  {profile.BusinessStreet}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Postal code"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <MarkunreadMailboxIcon fontSize="medium" />
                  {profile.BusinessPostcode}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Place"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <LocationCityIcon fontSize="medium" />
                  {profile.BusinessPlaats}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Country"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <PublicIcon fontSize="medium" />
                  {profile.BusinessCountry ?? profile.Country}
                </Stack>
              }
            />
          </Grid>
        </Grid>

        {/* PRIVÉ */}
        <Divider />
        <Typography variant="h6" sx={{ py: 1.5 }}>
          Private
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Telephone"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <PhoneIphoneIcon fontSize="medium" />
                  {profile.PrivatePhone ?? profile.MobilePhone}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Street name/house number"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <HomeIcon fontSize="medium" />
                  {profile.PrivateStreet}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Postal code"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <MarkunreadMailboxIcon fontSize="medium" />
                  {profile.PrivatePostcode}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Place of residence"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <LocationCityIcon fontSize="medium" />
                  {profile.PrivatePlaats ?? profile.City}
                </Stack>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Country"
              value={
                <Stack
                  direction="row"
                  sx={{ gap: 0.5 }}
                  spacing={1}
                  alignItems="center"
                >
                  <PublicIcon fontSize="medium" />
                  {profile.PrivateCountry ?? profile.Country}
                </Stack>
              }
            />
          </Grid>
        </Grid>
      </Collapse>

      {/* bottom separator + expand button */}
      <Divider sx={{ mt: 2, mb: 1.5 }} />
      <Box display="flex" justifyContent="flex-end">
        <Button
          size="small"
          onClick={() => setExpanded((x) => !x)}
          endIcon={
            <ExpandMoreIcon
              sx={(theme) => ({
                transition: theme.transitions.create("transform", {
                  duration: 160,
                  easing: theme.transitions.easing.easeInOut,
                }),
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              })}
            />
          }
        >
          {expanded ? "Show less" : "Show More"}
        </Button>
      </Box>
    </Paper>
  );
}
