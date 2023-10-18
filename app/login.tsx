import { useState } from "react";
import axios from "axios";
import {Link, useRouter} from "expo-router";

import {ENDPOINT_MS_USER} from '@env';

import { useUserStore } from "../components/UserAuth";
import Header from "../components/Header";
import Background from "../components/Background";
import Button from "../components/Button";
import { theme } from "../constants/theme";
import BackButton from "../components/BackButton";
import { StyleSheet, TextInput, View} from "react-native";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState({ value: 'marceloguerra215@gmail.com', error: '' });
  const [password, setPassword] = useState({ value: '2k18.marcelo', error: '' });
  const { accessToken, setAccessToken } = useUserStore();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.0.4:4001/auth/login', {
        email: email,
        password: password,
      });
  
      const accessToken = response.data.access_token;

      if (accessToken != undefined) {
        setAccessToken(accessToken);
        router.replace('/(home)');
      }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
      
    }
  };
  
  return (
    <Background imageSource={require('../assets/background_2.png')}>
      <View style={styles.container}>
      <Header>Login</Header>
      <TextInput
          style={styles.input}
          placeholder="Email"
          value={email.value}
          onChangeText={(text) => setEmail({value: text, error: ''})}
        />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <Link style={{fontSize: 18, margin: 15, fontWeight: 'bold', color: theme.colors.primary}} href={'/recovery'}>Reset Password</Link>
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => login(email.value, password.value)}> Login</Button>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 12
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"rgba(255,255, 255, 0.8)",
    marginBottom: 200,
    marginTop:200,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "rgba(255,255, 255, 0.8)",
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  notificationContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  notification: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
});
