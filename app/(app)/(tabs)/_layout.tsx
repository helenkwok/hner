import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(news)"
        options={{
          title: "News",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
