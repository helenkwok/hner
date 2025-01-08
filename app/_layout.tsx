import { Slot } from "expo-router";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://5c2f3bbf6b9c114f87846f4af96b7889@o4508596100268032.ingest.de.sentry.io/4508608368738384",

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
  //tracesSampleRate: 1.0,
});

export default function RootLayout() {
  return <Slot />;
}
