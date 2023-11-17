import { useState } from "react";
import axios from "axios";
import {Link, useRouter} from "expo-router";

import {ENDPOINT_MS_AUTH} from '@env';

import { useUserStore } from "../../components/UseUserStore";
import Header from "../../components/Header";
import Background from "../../components/Background";
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import {Text, TextInput, View, KeyboardAvoidingView} from "react-native";
import container from "../../constants/container";

export default function Login() {
  const router = useRouter()
  const [emailUser, setEmailUser] = useState({ value: 'mguerradubo@gmail.com', error: '' });
  const [password, setPassword] = useState({ value: 'marcelo', error: '' });
  const { accessToken, setAccessToken} = useUserStore();
  const {email, setEmail } = useUserStore()
  const [error, setError] = useState('');
  const login = async (emailUser: string, password: string) => {
    try {
      /*
      const response = await axios.post(`${ENDPOINT_MS_AUTH}/login`, {
        email: emailUser,
        password: password,
      });
      */
      //console.log(accessToken);
    
      const response = await axios.post(`${ENDPOINT_MS_AUTH}/login`, {
        email: emailUser,
        password: password,
      });
  
      const accessToken = response.data.access_token;
      console.log("access token:",accessToken);

      if (accessToken != undefined) {
        setAccessToken(accessToken);
        setEmail(emailUser);
        router.replace('/(home)/projects');
      }
    } catch (error) {
        setError("Login error")
        console.error("Login error", error);
      
    }
  };
  
  return (

      <KeyboardAvoidingView  behavior='height' style={container.container} keyboardVerticalOffset={0}>
      <Header>Login</Header>
      <Text style={container.title}>Email</Text>
      <TextInput
          style={container.input}
          placeholder="Email"
          value={emailUser.value}
          onChangeText={(text) => setEmailUser({value: text, error: ''})}
        />
        <Text style={container.title}>Password</Text>
      <TextInput 
        style={container.input}
        placeholder="Password"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <Link style={{fontSize: 18, margin: 15, fontWeight: 'bold', color: theme.colors.primary}} href={'/signIn/recovery'}>Reset Password</Link>
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => login(emailUser.value, password.value)}> Login</Button>
      <Text style={{color: theme.colors.primary}}>{error}</Text>
      </KeyboardAvoidingView>
  );
}
