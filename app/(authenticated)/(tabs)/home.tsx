import { Dropdown } from "@/components/dropdown";
import { RoundedButton } from "@/components/rounded-button";
import Colors from "@/constants/Colors";
import { useBalanceStore } from "@/store/balanceStore";
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import WidgetList from "@/components/sortable-list/widget-list";
import { useHeaderHeight } from "@react-navigation/elements"

function Page() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { balance, runTransaction, clearTransactions, transactions } = useBalanceStore()
  const headerHeight = useHeaderHeight();

  function handleAddMoney() {
    runTransaction({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      amount: 100,
      date: new Date(),
      title: "Added money",
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: headerHeight }} style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundedButton text="Add money" icon={"add"} onPress={handleAddMoney} />
        <RoundedButton text="Exchange" icon={'refresh'} onPress={clearTransactions} />
        <RoundedButton text="Details" icon={'list'} />
        <RoundedButton text="More" icon={'ellipsis-horizontal'} onPress={() => setModalVisible(!isModalVisible)} />

        <Dropdown isVisible={isModalVisible} handleOpen={() => setModalVisible(!isModalVisible)} />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && <Text style={{
          padding: 14,
          color: Colors.gray,
        }}>No transactions yet</Text>}
        {transactions.map((transaction) => (
          <View key={transaction.id}>
            <Text>{transaction.title}</Text>
          </View>
        ))}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  account: {
    marginVertical: 80,
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
    position: 'relative',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20
  }
});

export default Page;
