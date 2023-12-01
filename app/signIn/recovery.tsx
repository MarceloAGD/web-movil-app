import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView} from "react-native";
import axios from "axios";
import {Link, useRouter} from "expo-router";
import { ENDPOINT_MS_AUTH} from "@env";
import Background from "../../components/Background";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import { MonoText } from "../../components/StyledText";
import Button from "../../components/Button";
import container from "../../constants/container";

export default function ResetPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [notification, setNotification] = useState("");

  const sendMail = async () => {
    try {
      await axios.post(`${ENDPOINT_MS_AUTH}/recover`, { email });
      setEmailSent(true);
      setNotification("Correo enviado");
      router.push('/signIn/reset');
    } catch (error) {
      console.error("Error al enviar código", error);
      setNotification("Error al enviar el código");
    }
  };

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Header>Reset Password</Header>
      <MonoText style={{color: theme.colors.primary, padding: 10}}>Enter your email to send your recovery code</MonoText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button style={{...container.button, backgroundColor: theme.colors.primary }} mode="contained" onPress={sendMail} > <Link href={{
        pathname: '/signIn/reset',
        params: { email: email },
      }}>Continue
      </Link></Button>
        <Button style={container.button}textColor={theme.colors.primary } mode="outlined" onPress={() => router.replace('/')}> Cancel</Button>
      </View>

      <Text style={styles.notification}>{notification}</Text>
    </KeyboardAvoidingView>
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
