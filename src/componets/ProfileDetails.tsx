// components/profile/ProfileDetails.tsx
import * as React from "react";
import { Paper, Divider, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SectionTitle, FieldRow } from "./ProfileCardV1";
import type { Profile } from "./ProfileCardV1";

// Props were incorrectly typed as `Profile` causing TS error:
// "Property 'profile' does not exist on type 'Profile'".
// Fix by annotating props shape explicitly.
export default function ProfileDetails({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, border: 0 }}>
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Contact information
      </Typography>
      <Divider />
      {/* ALGEMEEN — always visible */}
      <Typography variant="h6" sx={{py:1.5}}>
        General
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="E-mail"
            value={profile.PrimaryEmail}
            link={
              profile.PrimaryEmail
                ? `mailto:${profile.PrimaryEmail}`
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow label="Function" value={profile.JobTitle} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow label="Department" value={profile.Department} />
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
          <FieldRow label="Language" value={profile.Language} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow label="EmployeeID" value={profile.EmployeeId} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldRow
            label="UserPrincipalName"
            value={profile.UserPrincipalName}
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
        <Typography variant="h6" sx={{py:1.5}}>
          Work
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Company-name" value={profile.Company} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Telephone"
              value={profile.BusinessPhones ?? profile.BusinessPhone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Street name/house number"
              value={profile.BusinessStreet}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Postal code" value={profile.BusinessPostcode} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Place" value={profile.BusinessPlaats} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Country"
              value={profile.BusinessCountry ?? profile.Country}
            />
          </Grid>
        </Grid>

        {/* PRIVÉ */}
        <Divider />
        <Typography variant="h6" sx={{py:1.5}}>
          Private
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Telephone"
              value={profile.PrivatePhone ?? profile.MobilePhone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Street name/house number"
              value={profile.PrivateStreet}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow label="Postal code" value={profile.PrivatePostcode} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FieldRow
              label="Place of residence"
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
