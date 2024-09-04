import { useListings } from "@/hooks/useListings";
import { useEffect } from "react";
import { View, Text } from "react-native";

function Page() {
  const { data, isLoading, error } = useListings()
  
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

export default Page;
