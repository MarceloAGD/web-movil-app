import React, { useState } from "react";
import { View, Text, TextInput} from "react-native";
import axios from "axios";
import {useRouter} from "expo-router";
import { ENDPOINT_MS_AUTH } from "@env";
import Background from "../components/Background";
import { theme } from "../constants/theme";
import Header from "../components/Header";
import container from "../constants/container";
import Button from "../components/Button";

export default function ResetPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [notification, setNotification] = useState("");

  const sendMail = async () => {
    try {
      await axios.post(`${ENDPOINT_MS_AUTH}/recover`, { email });
      setEmailSent(true);
      setNotification("Correo enviado");
    } catch (error) {
      console.error("Error al enviar código", error);
      setNotification("Error al enviar el código");
    }
  };

  const reset = async () => {
    try {
      const response = await axios.post(`${ENDPOINT_MS_AUTH}/reset`, {
        token: code,
        password,
        passwordConfirm: confirmPassword,
      });

      router.replace('/Login');
    } catch (error) {
      console.error("Error al resetear contraseña:", error);
    }
  };

  return (
    <Background imageSource={require('../assets/background_2.png')}>
    <View style={container.container}>
      <Header>Reset Password</Header>
      <View style={container.inputContainer}>
      <Text style={container.title}>Recovery code</Text>
      <TextInput
        style={container.input}
        placeholder="Recovery code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <Text style={container.title}>Password</Text>
      <TextInput
        style={container.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={container.title}>Confirm password</Text>
      <TextInput
        style={container.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        mode="contained"
        onPress={reset}
        style={{backgroundColor:theme.colors.primary}}
      > Reset password</Button>
      </View>
    </View>
    </Background>
  );
}