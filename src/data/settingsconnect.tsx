import * as React from "react";
import {
  Stack,
  Typography,
  Avatar,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  ListItemIcon,
} from "@mui/material";

import {
  Facebook,
  Business,
  CalendarMonth,
  Place,
  CloudOutlined,
  GroupsOutlined,
  Microsoft,
  Instagram,
  Mail,
  LinkedIn,
  X,
} from "@mui/icons-material";

export default function SettingsPage() {
  // platform connects
  const [connected, setConnected] = React.useState({
    facebook: false,
    microsoft: false,
    twitter: false,
    instagram: false,
  });

  const IG_GRADIENT = `linear-gradient(
  135deg,
  #405DE6 0%,
  #5B51D8 12%,
  #833AB4 24%,
  #C13584 36%,
  #E1306C 48%,
  #FD1D1D 60%,
  #F56040 72%,
  #FCAF45 84%,
  #FFDC80 100%
)`;

  // microsoft sub-switches
  const [msSubs, setMsSubs] = React.useState({
    outlook: true,
    onedrive: true,
    teams: true,
  });

  const togglePlatform = (pid: keyof typeof connected) => () => {
    setConnected((prev) => {
      const next = !prev[pid];
      if (!next && pid === "microsoft") {
        setMsSubs({ outlook: true, onedrive: true, teams: true });
      }
      return { ...prev, [pid]: next };
    });
  };

  const toggleMsSub =
    (sid: keyof typeof msSubs) =>
    (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      setMsSubs((prev) => ({ ...prev, [sid]: checked }));

  return (
    <Stack spacing={3}>
      {/* Profile header */}
      <Card>
        <CardContent>
          <Stack sx={{ alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Typography variant="h6">Yannick Daantje</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                gap: { xs: 1.5, sm: 5 },
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <Business />
                <Typography variant="subtitle2">Software Developer</Typography>
              </Stack>
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <Place />
                <Typography variant="subtitle2">Dordrecht</Typography>
              </Stack>
              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <CalendarMonth />
                <Typography variant="subtitle2">
                  Sinds 1 september 2025
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card sx={{ border: 0, boxShadow: 0 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Verbonden accounts
          </Typography>

          {/* Facebook (no subs) */}
          <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.facebook ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("facebook")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.facebook ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#3b5998" }}>
                    <Facebook sx={{ color: "white" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Facebook"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Divider />

          {/* Microsoft (with subs) */}
          <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.microsoft ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("microsoft")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.microsoft ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(90deg, #004fe1, #08a1f7, #03c1f4, #09e0fe)", // your blue gradient
                    }}
                  >
                    <Microsoft />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Microsoft"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>

            <AccordionDetails>
              <List dense disablePadding>
                <ListItem
                  disableGutters
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={msSubs.outlook}
                      onChange={toggleMsSub("outlook")}
                      disabled={!connected.microsoft}
                    />
                  }
                  sx={{ pr: 6 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: connected.microsoft
                        ? "text.primary"
                        : "text.disabled",
                    }}
                  >
                    <Mail />
                  </ListItemIcon>
                  <ListItemText primary="Outlook" />
                </ListItem>

                <ListItem
                  disableGutters
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={msSubs.onedrive}
                      onChange={toggleMsSub("onedrive")}
                      disabled={!connected.microsoft}
                    />
                  }
                  sx={{ pr: 6 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: connected.microsoft
                        ? "text.primary"
                        : "text.disabled",
                    }}
                  >
                    <CloudOutlined />
                  </ListItemIcon>
                  <ListItemText primary="OneDrive" />
                </ListItem>

                <ListItem
                  disableGutters
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={msSubs.teams}
                      onChange={toggleMsSub("teams")}
                      disabled={!connected.microsoft}
                    />
                  }
                  sx={{ pr: 6 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: connected.microsoft
                        ? "text.primary"
                        : "text.disabled",
                    }}
                  >
                    <GroupsOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Divider />

          {/* Twitter  */}
          <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.twitter ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("twitter")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.twitter ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "black" }}>
                    <X sx={{ color: "white" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="X"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Divider />

          {/* Instagram */}
          <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.instagram ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("instagram")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.instagram ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundImage: IG_GRADIENT, // <- your full IG gradient
                    }}
                  >
                    <Instagram />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary="Instagram"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Divider />
          <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.instagram ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("instagram")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.instagram ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "#0A66C2", // LinkedIn blue
                    }}
                  >
                    <LinkedIn sx={{ color: "white" }} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary="LinkedIn"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Divider />
                <Accordion disableGutters elevation={0} square defaultExpanded>
            <AccordionSummary>
              <ListItem
                disableGutters
                secondaryAction={
                  <Button
                    size="small"
                    variant={connected.instagram ? "outlined" : "contained"}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlatform("instagram")();
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {connected.instagram ? "Loskoppelen" : "Verbinden"}
                  </Button>
                }
                sx={{ pr: 7 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "#0A66C2", // LinkedIn blue
                    }}
                  >
                    <LinkedIn sx={{ color: "white" }} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary="LinkedIn"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </AccordionSummary>
          </Accordion>
        </CardContent>
      </Card>
    </Stack>
  );
}
