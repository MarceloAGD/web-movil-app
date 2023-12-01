import React, { useState, useEffect } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ENDPOINT_MS_AUTH } from "@env";
import Background from "../../components/Background";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import container from "../../constants/container";
import Button from "../../components/Button";

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [notification, setNotification] = useState("Correo enviado");
  const [cooldown, setCooldown] = useState(0); // Tiempo de espera entre reenvíos
  const [resendDisabled, setResendDisabled] = useState(false); // Controla si el botón de reenvío está deshabilitado

  useEffect(() => {
    // Actualizar el estado del botón de reenvío basado en el valor de cooldown
    setResendDisabled(cooldown > 0);

    // Configurar el temporizador para actualizar cooldown cada segundo
    const interval = setInterval(() => {
      if (cooldown > 0) {
        setCooldown(cooldown - 1);
      }
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(interval);
  }, [cooldown]);

  const sendMail = async () => {
    try {
      await axios.post(`${ENDPOINT_MS_AUTH}/recover`, { email });
      setEmailSent(true);
      setNotification("Correo enviado");
      setCooldown(60); // Establecer el tiempo de espera en segundos (puedes ajustar esto según tus necesidades)
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
      console.error("Error reset password:", error);
    }
  };

  return (
      <KeyboardAvoidingView behavior="height" style={container.container}>
        <Header>Reset Password</Header>

        {emailSent && (
          <View style={styles.notificationContainer}>
            <Text style={styles.notification}>{notification}</Text>
            <Button
              textColor="white"
              style={{ backgroundColor: theme.colors.primary }}
              onPress={() => {
                if (!resendDisabled) {
                  sendMail();
                  setNotification("");
                }
              }}
              disabled={resendDisabled} // Deshabilitar el botón si el cooldown aún está activo
            >
              {resendDisabled ? `Reenviar en ${cooldown} segundos` : "Reenviar código"}
            </Button>
          </View>
        )}
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
            style={{ backgroundColor: theme.colors.primary }}
          >
            Reset password
          </Button>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
