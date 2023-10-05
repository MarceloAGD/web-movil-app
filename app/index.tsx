import { StyleSheet} from "react-native";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import axios from "axios";
import {useRouter} from "expo-router"
import { theme } from '../constants/theme';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from "../components/Header";
export default function StartScreen() {
  const router = useRouter()
 return (
  <Background>
    <Header>Bienvenido</Header>
    <Button mode="contained" onPress={() => router.replace('/Login')}> Login</Button>
    <Button mode="outlined" onPress={() => router.replace('/signIn')}> Sign Up</Button>
  </Background>
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
