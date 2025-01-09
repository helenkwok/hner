import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

Sentry.init({
  dsn: "https://5c2f3bbf6b9c114f87846f4af96b7889@o4508596100268032.ingest.de.sentry.io/4508608368738384",

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
  //tracesSampleRate: 1.0
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
