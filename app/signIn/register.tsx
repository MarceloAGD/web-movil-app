import React, { useState } from "react";
import axios from 'axios';
import {useRouter} from "expo-router";
import {ENDPOINT_MS_USER} from '@env';
import Background from "../../components/Background";
import Header from "../../components/Header";
import Button from "../../components/Button";

import { theme } from "../../constants/theme";
import { Text } from "../../components/Themed";
import { KeyboardAvoidingView, TextInput, View} from "react-native";
import container from "../../constants/container";

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState({ value: '', error: '' });
  const [lastname, setLastname] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [error, setError] = useState('')

  const signUp = async (name: string, lastname: string, email: string, password: string) => {
    try {
      /*
      const response = await axios.post(
        `${ENDPOINT_MS_USER}/sign-up`,
        {
          name,
          lastname,
          email,
          password,
        }*/
        const response = await axios.post(
          `${ENDPOINT_MS_USER}/sign-up`,
          {
            name,
            lastname,
            email,
            password,
          }
      );
      if(response.data.err){
        setError('User already exists');     
      } else {
        router.replace('/');
      }
    } catch (error) {
      setError('Error registering user');
      console.error("Error registering user:", error);
    }
    
  };
  return (
  
      <KeyboardAvoidingView behavior='height' style={container.container} >
      
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
      <Text style={{color: theme.colors.primary}}>{error}</Text>
     
      </KeyboardAvoidingView>
      
  );
}
