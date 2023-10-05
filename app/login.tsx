import { StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import axios from "axios";
import {useRouter} from "expo-router"
import {ENDPOINT_MS_USER} from '@env';

import { useUserStore } from "../components/UserAuth";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("diego@gmail.com");
  const [password, setPassword] = useState("1234");
  const { accessToken, setAccessToken } = useUserStore();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${ENDPOINT_MS_USER}/sign-in`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      const accessToken = response.data.accessToken;
      
      setAccessToken(accessToken);
      
      router.replace('/(home)');

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
      <Button title="Sign In" onPress={() => signIn(email, password)} />
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
