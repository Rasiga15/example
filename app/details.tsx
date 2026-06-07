import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Details() {
  const { title, category } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>
        Category: {category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
    marginTop: 10,
  },
});