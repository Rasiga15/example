import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");


  const handleLogout = () => {
    BackHandler.exitApp();
  };


  const submitData = async () => {
    setNameError("");
    setEmailError("");

    let valid = true;


    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    }

   
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email address");
        valid = false;
      }
    }

    if (!valid) return;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const postData = await response.json();

      console.log("POST Status:", response.status);
      console.log("POST Response:", postData);

      alert("Data Submitted Successfully");

      getData();

      setName("");
      setEmail("");
    } catch (error) {
      console.log("POST Error:", error);
    }
  };

  // GET API
  const getData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );

      const data = await response.json();

      console.log("GET Status:", response.status);
      console.log("GET Response:", data);

      setUserData(data);
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        User Form
      </Text>

      {/* Name Input */}
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {nameError ? (
        <Text style={styles.error}>
          {nameError}
        </Text>
      ) : null}

      {/* Email Input */}
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {emailError ? (
        <Text style={styles.error}>
          {emailError}
        </Text>
      ) : null}


      <TouchableOpacity
        style={styles.button}
        onPress={submitData}
      >
        <Text style={styles.buttonText}>
          Submit
        </Text>
      </TouchableOpacity>

      {/* GET API Data */}
      {userData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            GET API Response
          </Text>

          <Text>
            Name: {userData.name}
          </Text>

          <Text>
            Email: {userData.email}
          </Text>

          <Text>
            Phone: {userData.phone}
          </Text>

          <Text>
            Website: {userData.website}
          </Text>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f5f5f5",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    marginTop: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  logoutButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
});