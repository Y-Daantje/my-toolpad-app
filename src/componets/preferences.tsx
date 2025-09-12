import * as React from "react";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid";

type PreferencesCardProps = {
  language?: string;
  onLanguageChange?: (lang: string) => void;
  themeMode?: string;
  onThemeModeChange?: (mode: string) => void;
  sendOnEnter?: boolean; // if true: Enter sends, Shift+Enter = newline
  onSendOnEnterChange?: (val: boolean) => void;
};

export default function PreferencesCard({
  language = "nl-NL",
  onLanguageChange,
  themeMode = "dark",
  onThemeModeChange,
  sendOnEnter = false,
  onSendOnEnterChange,
}: PreferencesCardProps) {
  const [lang, setLang] = React.useState(language);
  const [mode, setMode] = React.useState(themeMode);
  const [enterSends, setEnterSends] = React.useState(sendOnEnter);

  const handleLang = (v: string) => {
    setLang(v);
    onLanguageChange?.(v);
  };

  const handleMode = (v: string) => {
    setMode(v);
    onThemeModeChange?.(v);
  };

  const handleEnter = (v: boolean) => {
    setEnterSends(v);
    onSendOnEnterChange?.(v);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 3 },
        border: 0,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4">General Preferences</Typography>
      <Divider sx={{ mt: 1.5, mb: 2 }} />

      <Grid container spacing={3}>
        {/* Taal */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={0.5}>
            <FormControl
              fullWidth
              sx={{
                mt: 0.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <InputLabel id="pref-lang-label">Language</InputLabel>
              <Select
                labelId="pref-lang-label"
                label="Language"
                size="small"
                value={lang}
                onChange={(e) => handleLang(String(e.target.value))}
              >
                <MenuItem value="nl-NL">Nederlands (NL)</MenuItem>
                <MenuItem value="en-US">English (US)</MenuItem>
                <MenuItem value="en-GB">English (UK)</MenuItem>
                <MenuItem value="es-ES">Español (ES)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Dark mode */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={0.5}>
            <FormControl
              fullWidth
              sx={{
                mt: 0.5,
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
              }}
            >
              <InputLabel id="pref-mode-label">Theme</InputLabel>

              <Select
                labelId="pref-mode-label"
                label="Theme"
                size="small"
                value={mode}
                onChange={(e) => handleMode(String(e.target.value))}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Bericht verzenden */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={0.5} sx={{ width: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
              Send message
            </Typography>

            <Typography variant="body2" sx={{ p: 0.5 }}>
              Use Shift + Enter instead of Enter to send
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch
                checked={enterSends}
                onChange={(_, v) => handleEnter(v)}
              />
              <Typography variant="body2">
                {enterSends ? "Enter = Send" : "Enter = New Row"}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
