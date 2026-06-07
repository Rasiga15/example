import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [selected, setSelected] = useState("Nature");

  const categories = [
    "Nature",
    "Animals",
    "Food",
    "Travel",
    "Sports",
    "Music",
    "Movies",
    "Technology",
  ];

  const cardData = [
  {
    id: 1,
    category: "Nature",
    title: "Nature 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  {
    id: 2,
    category: "Animals",
    title: "Lion",
    description:
      "Lion is known as the king of the jungle. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },

  {
    id: 3,
    category: "Food",
    title: "Pizza",
    description:
      "Pizza is one of the most popular foods in the world. Lorem ipsum dolor sit amet.",
  },

  {
    id: 4,
    category: "Technology",
    title: "React Native",
    description:
      "React Native is a framework used to build mobile applications using JavaScript and React.",
  },
];

  const filteredCards = cardData.filter(
    (item) => item.category === selected
  );

  return (
    <FlatList
      data={filteredCards}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListHeaderComponent={
        <>
          {/* Banner */}
          <ImageBackground
            source={require("../../assets/images/HOME BANNER.jpg")}
            style={styles.image}
          >
            <Text style={styles.title}>Welcome</Text>
          </ImageBackground>

          {/* Search Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <Text style={styles.buttonText}>
              Go to Search
            </Text>
          </TouchableOpacity>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterButton,
                  selected === item && styles.activeButton,
                ]}
                onPress={() => setSelected(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected === item && styles.activeText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      }
    renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: "/details",
        params: {
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
        },
      })
    }
  >
    <ImageBackground
      source={require("../../assets/images/HOME BANNER.jpg")}
      style={styles.cardImage}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>
          {item.title}
        </Text>

        <Text style={styles.cardCategory}>
          {item.category}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
)}
    />
  );
}

const styles = StyleSheet.create({
  cardCategory: {
  color: "#fff",
  marginTop: 5,
  fontSize: 14,
},
  image: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  button: {
    backgroundColor: "orange",
    width: "60%",
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  filterContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 15,
  },

  filterButton: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeButton: {
    backgroundColor: "blue",
  },

  filterText: {
    color: "#000",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

  card: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  cardImage: {
    height: 180,
    justifyContent: "flex-end",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});