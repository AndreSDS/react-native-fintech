import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { TouchableOpacity, Text, AppState, Platform } from "react-native";
import type { AppStateStatus } from 'react-native'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo'
import * as SecureStore from "expo-secure-store";

const queryClient = new QueryClient()
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from "expo-router";

const defaultNavgationOptions = {
  title: "",
  headerBackTitle: "",
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: Colors.background,
  },
};

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(authenticated)";

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
  
    return () => subscription.remove()
  }, [])

  if (!loaded || !isLoaded) return <Text>Loading...</Text>;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          ...defaultNavgationOptions,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          ...defaultNavgationOptions,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href="/help" asChild>
              <TouchableOpacity onPress={router.back}>
                <Ionicons
                  name="help-circle-outline"
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          ...defaultNavgationOptions,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <QueryClientProvider client={queryClient}>
            <InitialLayout />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
