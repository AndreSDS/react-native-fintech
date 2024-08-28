import { CustomHeader } from "@/components/custom-header";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";

function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => <BlurView tint="extraLight" intensity={80} style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.05)'
        }} />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="registered" color={color} size={size} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true
        }}
      />

      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfers",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bitcoin" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "LifeStyle",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

export default Layout;
