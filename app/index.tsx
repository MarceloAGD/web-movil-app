import { StyleSheet, Button, TextInput, ImageBackground } from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import axios from "axios";
import {useRouter} from "expo-router"
import { theme } from '../constants/theme';

export default function StartScreen() {
  const router = useRouter()
 return (
  <ImageBackground source={require('../assets/background_dot.png')} style={styles.background}>
  <View style={styles.container}>
    <Text style={styles.text}>Bienvenido</Text>
    <View style={styles.button}>
      <Button title="Login" onPress={() => router.replace('/login')} />
    </View>
    <View style={styles.button}>
    <Button title="Sign In" onPress={() => router.replace('/signIn')} />
    </View>
  </View>
  </ImageBackground>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
})
