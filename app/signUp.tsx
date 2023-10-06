import React, { useState } from "react";
import axios from 'axios';
import {useRouter} from "expo-router";
import {ENDPOINT_MS_USER} from '@env';
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from '../components/TextInput';
import { theme } from "../constants/theme";

import { useUserStore } from "../components/UserAuth";
import { Text } from "../components/Themed";
import BackButton from "../components/BackButton";

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
      <BackButton goBack={() => router.replace('/')}/>
    <Header>Register</Header>
      <TextInput 
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
      />
      <TextInput 
        label="Lastname"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={text => setLastname({ value: text, error: '' })}
      />
      <TextInput 
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
      />
      <TextInput 
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => signUp(name.value, lastname.value, email.value, password.value)}> Register</Button>
      <Text>{error}</Text>
      </Background>
  );
}
