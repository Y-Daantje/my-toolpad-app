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
  colors,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Apps as AppsIcon,
  Business,
  CalendarMonth,
  Place,
  MailOutline,
  CloudOutlined,
  GroupsOutlined,
  Microsoft,
} from "@mui/icons-material";

type SubService = { id: string; label: string; icon?: React.ReactNode };
type Platform = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  subServices?: SubService[];
};

const instaGradient = {
  background:
    "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const PLATFORMS: Platform[] = [
  {
    id: "facebook",
    name: "Facebook",
    description: "Plan properly your workflow",
    icon: <FacebookIcon sx={{ color: "primary.main" }} />,
    subServices: [], // no subs -> flat row
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Connect your work apps",
    icon: <Microsoft sx={{ color: "primary.main" }} />,
    subServices: [
      { id: "outlook", label: "Outlook", icon: <MailOutline /> },
      { id: "onedrive", label: "OneDrive", icon: <CloudOutlined /> },
      { id: "teams", label: "Teams", icon: <GroupsOutlined /> },
    ],
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Keep eye on your Repositories",
    icon: <TwitterIcon sx={{ color: "primary.light" }} />,
    subServices: [],
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Keep up with the stories",
    icon: <InstagramIcon sx={{ color: "secondary.main" }} />,
    subServices: [],
  },
];

export default function SettingsPage() {
  // connect/disconnect per platform (outside row button)
  const [connected, setConnected] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(PLATFORMS.map((p) => [p.id, false]))
  );

  // switches per sub-service (multi-select), safe init with ?? []
  const [subServices, setSubServices] = React.useState<
    Record<string, Record<string, boolean>>
  >(() =>
    Object.fromEntries(
      PLATFORMS.map((p) => [
        p.id,
        Object.fromEntries((p.subServices ?? []).map((s) => [s.id, false])),
      ])
    )
  );

  const handlePlatformToggle = (pid: string) => () => {
    setConnected((prev) => {
      const next = !prev[pid];
      // when disconnecting, clear sub selections
      if (!next) {
        setSubServices((ss) => ({
          ...ss,
          [pid]: Object.fromEntries(
            Object.keys(ss[pid] ?? {}).map((sid) => [sid, false])
          ),
        }));
      }
      return { ...prev, [pid]: next };
    });
  };

  const handleSubToggle =
    (pid: string, sid: string) =>
    (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setSubServices((prev) => ({
        ...prev,
        [pid]: { ...(prev[pid] ?? {}), [sid]: checked },
      }));
    };

  const activeCount = (pid: string) =>
    Object.values(subServices[pid] ?? {}).filter(Boolean).length;

  const secondaryText = (p: Platform) => {
    const count = activeCount(p.id);
    const base = p.description;
    if (!connected[p.id]) return base;
    return count > 0
      ? `${base} • ${count} service${count > 1 ? "s" : ""} active`
      : `${base} • No services active`;
  };

  return (
    <Stack spacing={3}>
      {/* Profile header */}
      <Card>
        <CardContent>
          <Stack direction="column" sx={{ alignItems: "center", gap: 2 }}>
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
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Connected accounts
          </Typography>

          {PLATFORMS.map((p, idx) => (
            <React.Fragment key={p.id}>
              <Accordion disableGutters elevation={0} square>
                {/* no expand arrow (you asked to remove) */}
                <AccordionSummary>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <Button
                        size="small"
                        variant={connected[p.id] ? "outlined" : "contained"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlatformToggle(p.id)();
                        }}
                        onFocus={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        {connected[p.id] ? "Disconnect" : "Connect"}
                      </Button>
                    }
                    sx={{ pr: 7 }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "transparent", color: "inherit" }}>
                        {p.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name}
                      primaryTypographyProps={{ fontWeight: 600 }}
                      secondary={secondaryText(p)}
                    />
                  </ListItem>
                </AccordionSummary>

                {/* Only show details if subServices exist */}
                {p.subServices && p.subServices.length > 0 && (
                  <AccordionDetails>
                    <List dense disablePadding>
                      {p.subServices.map((s) => (
                        <ListItem
                          key={s.id}
                          disableGutters
                          secondaryAction={
                            <Switch
                              edge="end"
                              checked={subServices[p.id]?.[s.id] || false}
                              onChange={handleSubToggle(p.id, s.id)}
                              disabled={!connected[p.id]}
                            />
                          }
                          sx={{ pr: 6 }}
                        >
                          {/* 👇 icon before label */}
                          <ListItemIcon
                            sx={{
                              minWidth: 32,
                              color: connected[p.id]
                                ? "text.primary"
                                : "text.disabled",
                            }}
                          >
                            {s.icon}
                          </ListItemIcon>
                          <ListItemText primary={s.label} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                )}
              </Accordion>

              {/* Divider only if not last AND has subs */}
              {idx < PLATFORMS.length - 1 &&
                p.subServices &&
                p.subServices.length > 0 && <Divider />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </Stack>
  );
}
