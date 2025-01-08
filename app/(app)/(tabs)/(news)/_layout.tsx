import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "News",
        }}
      />
    </Stack>
  );
};

export default Layout;
