import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";
import {useRouter} from "expo-router";

import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from '../components/TextInput';
import { theme } from "../constants/theme";

export default function SignIn() {
  const router = useRouter()
  const [name, setName] = useState({ value: '', error: '' });
  const [lastname, setLastname] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  return (
    <Background>
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
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => router.replace('/(home)')}> Login</Button>
      </Background>
  );
}
