import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

      {/* Services */}
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hospital-building"
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

      {/* GPs */}
  <Tabs.Screen
  name="ourGPs"
  options={{
    title: "Our GPs",
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons
        name="stethoscope"
        size={size ?? 24}
        color={color}
      />
    ),
  }}
/>

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}