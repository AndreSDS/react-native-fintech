import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type TabButtonProps = {
  name: string;
  title: string;
  icon: string;
};

export function TabButton({ name, title, icon }: TabButtonProps) {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title: title,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name={icon} color={color} size={size} />
        ),
      }}
    />
  );
}
