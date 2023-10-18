import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import {useRouter} from "expo-router";
import { ENDPOINT_MS_USER } from "@env";
import Background from "../components/Background";
import { theme } from "../constants/theme";

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
      await axios.post(`${ENDPOINT_MS_USER}/recover`, { email });
      setEmailSent(true);
      setNotification("Correo enviado");
    } catch (error) {
      console.error("Error al enviar código", error);
      setNotification("Error al enviar el código");
    }
  };

  const reset = async () => {
    try {
      const response = await axios.post(`${ENDPOINT_MS_USER}/reset`, {
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
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        title="Reset password"
        onPress={reset}
        color={theme.colors.primary}
      />
      </View>
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
