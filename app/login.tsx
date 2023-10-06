import { useState } from "react";
import axios from "axios";
import {useRouter} from "expo-router";

import {ENDPOINT_MS_USER} from '@env';

import { useUserStore } from "../components/UserAuth";
import Header from "../components/Header";
import Background from "../components/Background";
import Button from "../components/Button";
import TextInput from '../components/TextInput';
import { theme } from "../constants/theme";
import BackButton from "../components/BackButton";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState({ value: 'marcelo@gmail.com', error: '' });
  const [password, setPassword] = useState({ value: '1234', error: '' });
  const { accessToken, setAccessToken } = useUserStore();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${ENDPOINT_MS_USER}/login`,
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
    <Background imageSource={require('../assets/background_2.png')}>
      <BackButton goBack={() => router.replace('/')}/>
      <Header>Login</Header>
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
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => login(email.value, password.value)}> Login</Button>
    </Background>
  );
}

