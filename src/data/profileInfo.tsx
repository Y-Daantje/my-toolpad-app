import React from "react";

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;

  employeeId?: string;
  city?: string;
  country?: string;
  managerName?: string;
  managerEmail?: string;
  teamsId?: string;
  oneDriveUrl?: string;
  officeLocation?: string;
  mobilePhone?: string;
  businessPhones?: string;
  userPrincipalName?: string;
  userHint?: string;
  startDateLabel?: string; // e.g., "Sinds 1 september 2025"
};

// mock / static for now. Replace with API.
const MOCK_PROFILE: Profile = {
  firstName: "Yannick",
  lastName: "Daantje",
  email: "yannick@example.com",
  jobTitle: "Software Developer",
  department: "Engineering",
  employeeId: "EMP-10293",
  city: "Dordrecht",
  country: "Netherlands",
  managerName: "Tippe van Roosmalen",
  managerEmail: "tippe@example.com",
  teamsId: "teams:1234-5678",
  oneDriveUrl: "https://onedrive.live.com/…",
  officeLocation: "HQ – 3rd floor",
  mobilePhone: "+31 6 12 34 56 78",
  businessPhones: "+31 10 123 4567",
  userPrincipalName: "yannick@example.com",
  userHint: "Prefers dark mode & compact UI",
  startDateLabel: "Sinds 1 september 2025",
};

export async function fetchProfile(): Promise<Profile> {
  // Swap this with your real fetch (Graph/Microservice/etc.)
  // await new Promise(r => setTimeout(r, 500)); // simulate latency
  return MOCK_PROFILE;
}

export function useProfile() {
  // super light custom hook – you can upgrade this to React Query later
  // to get caching, refetching, etc.
  const [data, setData] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;
    fetchProfile()
      .then((p) => mounted && setData(p))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
