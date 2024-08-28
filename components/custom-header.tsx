import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CustomHeader() {
    const { top } = useSafeAreaInsets();

    return (
        <BlurView tint="extraLight" intensity={80} style={{
            paddingTop: top
        }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.roundedBtn}>
                    <Text style={styles.textHeader}>SG</Text>
                </TouchableOpacity>

                <View style={styles.searchSection}>
                    <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.dark} />
                    <TextInput style={styles.inputSearch} placeholder="Search" placeholderTextColor={Colors.dark} />
                </View>

                <View style={styles.circle}>
                    <Ionicons name="stats-chart" size={20} color={Colors.dark} />
                </View>

                <View style={styles.circle}>
                    <Ionicons name="card" size={20} color={Colors.dark} />
                </View>
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        height: 60,
        paddingHorizontal: 20
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
        justifyContent: "center",
        alignItems: "center",
    },
    roundedBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray,
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500"
    },
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lightGray,
        borderRadius: 30
    },
    searchIcon: {
        marginLeft: 10
    },
    inputSearch: {
        width: "100%",
        padding: 10,
        fontSize: 16,
        color: Colors.dark
    }
})
