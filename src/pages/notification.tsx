import * as React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import Notifications, { NotificationPrefs } from "../componets/notification";

export default function NotificationsPage() {
  const [prefs, setPrefs] = React.useState<NotificationPrefs>({
    paymentEmails: true,
    taskReminders: true,
    securityAlerts: true,
    serviceAnnouncements: false,
  });

  return (
    <PageContainer title="">
      <Notifications prefs={prefs} onChange={setPrefs} />
    </PageContainer>
  );
}
