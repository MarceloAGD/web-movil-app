import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, TextInput } from "react-native";


export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text>Email</Text>
      <TextInput
        placeholder="email@email.com"
        value={email}
        inputMode="email"
        onChangeText={(text: string) => setEmail(text)}
        style={{color: "#fff"}}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        inputMode="text"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
        style={{color: "#fff"}}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
