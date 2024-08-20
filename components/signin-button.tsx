import { SignInType } from "@/constants/SignIn";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type SignInButtonProps = {
  handleSignIn: () => Promise<void>;
  color: string;
  icon: string;
  text: string;
};

export function SignInButton({
  handleSignIn,
  color,
  icon,
  text,
}: SignInButtonProps) {
  return (
    <TouchableOpacity
      onPress={handleSignIn}
      style={[
        defaultStyles.pillButton,
        {
          flexDirection: "row",
          gap: 16,
          marginTop: 20,
          backgroundColor: "#fff",
        },
      ]}
    >
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[defaultStyles.buttonText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
}
