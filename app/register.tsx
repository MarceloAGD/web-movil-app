import React, { useState } from "react";
import axios from 'axios';
import {useRouter} from "expo-router";
import {ENDPOINT_MS_AUTH} from '@env';
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";

import { theme } from "../constants/theme";

import { useUserStore } from "../components/UseUserStore";
import { Text } from "../components/Themed";
import { TextInput, View} from "react-native";
import container from "../constants/container";

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
        `${ENDPOINT_MS_AUTH}/sign-up`,
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
      <View style={{marginBottom: 130,marginTop: 130,flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:"rgba(255,255, 255, 0.8)",borderRadius: 15,}}>
    <Header>Register</Header>
    <Text style={container.title}>Name</Text>
      <TextInput 
        style={container.input}
        placeholder="Name"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
      />
      <Text style={container.title}>Lastname</Text>
      <TextInput 
        style={container.input}
        placeholder="Lastname"
        value={lastname.value}
        onChangeText={text => setLastname({ value: text, error: '' })}
      />
      <Text style={container.title}>Email</Text>
      <TextInput 
        style={container.input}
        placeholder="Email"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
      />
      <Text style={container.title}>Password</Text>
      <TextInput 
       style={container.input}
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
