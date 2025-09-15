// NotificationSettings.tsx
import * as React from "react";
import { Paper, Stack, Typography, Divider, Switch, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

export type NotificationPrefs = {
  paymentEmails: boolean;
  taskReminders: boolean;
  securityAlerts: boolean;
  serviceAnnouncements: boolean;
};

type SettingRowProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

function SettingRow({
  label,
  description,
  checked,
  onChange,
}: SettingRowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1 }}
    >
      <Box sx={{ pr: 2 }}>
        <Typography fontWeight={600}>{label}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Switch edge="end" checked={checked} onChange={onChange} />
    </Stack>
  );
}

// If you already have SectionTitle in your file, remove this and import yours.
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

export default function NotificationSettings({
  prefs,
  onChange,
}: {
  prefs: NotificationPrefs;
  onChange: (next: NotificationPrefs) => void;
}) {
  const set =
    (key: keyof NotificationPrefs) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      onChange({ ...prefs, [key]: checked });

  return (
    <Paper variant="outlined" sx={{ border: 0}}>
      <Typography variant="h4" sx={{ py: 1 }}>
        Notifications
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <SettingRow
            label="Payment emails"
            description="Receive an email when a payment is processed or fails."
            checked={prefs.paymentEmails}
            onChange={set("paymentEmails")}
          />
          <Divider />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SettingRow
            label="Task reminders"
            description="Get reminders for tasks you’ve created."
            checked={prefs.taskReminders}
            onChange={set("taskReminders")}
          />
          <Divider />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SettingRow
            label="Security alerts"
            description="Be notified about password changes and unusual sign-ins."
            checked={prefs.securityAlerts}
            onChange={set("securityAlerts")}
          />
          <Divider />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SettingRow
            label="Service announcements"
            description="Maintenance, incidents, and important service updates."
            checked={prefs.serviceAnnouncements}
            onChange={set("serviceAnnouncements")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
