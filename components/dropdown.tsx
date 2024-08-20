import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { RoundedButton } from "./rounded-button";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Modal from "react-native-modal";
import { useState } from "react";

type DropdownProps = {
  isVisible: boolean;
  handleOpen: () => void;
};

const items: {
  title: string;
  icon: typeof Ionicons.defaultProps;
}[] = [
  {
    title: "Statement",
    icon: "list",
  },
  {
    title: "Converter",
    icon: "cash",
  },
  {
    title: "Background",
    icon: "image",
  },
  {
    title: "Add new account",
    icon: "folder",
  },
];

export function Dropdown({ isVisible, handleOpen }: DropdownProps) {
  return (
    <Modal
      key="statement"
      style={{
        position: "absolute",
        top: 320,
        right: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop={false}
      isVisible={isVisible}
      onBackdropPress={handleOpen}
    >
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <>
            <View
              key={item.title}
              style={{
                width: 220,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text>{item.title}</Text>
              <Ionicons name={item.icon} size={24} color={Colors.dark} />
            </View>
            {index !== items.length - 1 && (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: Colors.lightGray,
                }}
              />
            )}
          </>
        )}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  account: {
    marginTop: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
