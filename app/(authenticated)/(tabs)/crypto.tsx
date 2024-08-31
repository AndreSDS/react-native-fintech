import { useEffect } from "react";
import { View, Text } from "react-native";

function Page() {

  async function doCall() {
    const res = await fetch("/api/listings")
    const data = await res.json()
    console.log({data});
    
  }

  useEffect(() => {
    doCall()
  }, [])

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

export default Page;
