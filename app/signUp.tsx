import React, { useState } from "react";
import axios from 'axios';
import {useRouter} from "expo-router";
import {ENDPOINT_MS_USER} from '@env';
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";

import { theme } from "../constants/theme";

import { useUserStore } from "../components/UserAuth";
import { Text } from "../components/Themed";
import BackButton from "../components/BackButton";
import { StyleSheet, TextInput, View} from "react-native";

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState({ value: '', error: '' });
  const [lastname, setLastname] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { accessToken, setAccessToken } = useUserStore();
  const [error, setError] = useState('')

  const signUp = async (name: string, lastname: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${ENDPOINT_MS_USER}/sign-up`,
        {
          name,
          lastname,
          email,
          password,
        }
      );
      if(!response.data.accessToken){
        setError('Email ya está registrado');     
      } else {
        const accessToken = response.data.accessToken;
        setAccessToken(accessToken);
        router.replace('/(home)');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error("Error al iniciar sesión:", error);
    }
    
  };
  return (
    <Background imageSource={require('../assets/background_2.png')}>
      <View style={styles.container}>
    <Header>Register</Header>
      <TextInput 
        style={styles.input}
        placeholder="Name"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
      />
      <TextInput 
        style={styles.input}
        placeholder="Lastname"
        value={lastname.value}
        onChangeText={text => setLastname({ value: text, error: '' })}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
      />
      <TextInput 
       style={styles.input}
       placeholder="Password"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => signUp(name.value, lastname.value, email.value, password.value)}> Register</Button>
      <Text>{error}</Text>
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