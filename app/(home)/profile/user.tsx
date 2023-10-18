import {useRouter} from "expo-router";
import Background from '../../../components/Background';
import Header from "../../../components/Header";
import Button from '../../../components/Button';

import { useUserStore } from "../../../components/UseUserStore";
import { theme } from '../../../constants/theme';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {ENDPOINT_USER_MS} from '@env';
import { View , Text} from "react-native";
import { MonoText } from "../../../components/StyledText";

export default function User() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const {accessToken, removeAccessToken } = useUserStore();
    const {email}= useUserStore();

    useEffect(() => {
      axios.get('http://192.168.0.4:4001/auth/get-user', {
        params: {
        email: email,
        }, headers: {
          Authorization: `Bearer ${accessToken}`,
        } 
      }).then((user)=>{
        setName(user.data.name)
        setLastname(user.data.lastname)
      }).catch((error) => {
        console.error('Error getting user information:', error);
      });
    }, [email]);

    const handleLogout = async () => {
      try {
        await removeAccessToken();
        router.replace('/')
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

  return (
    <Background imageSource={require('../../../assets/background_5.png')}>
    <Header>Hi!</Header>
    <Text>{email}</Text>
    <View>
      <Text>{name} {lastname}</Text> 
    </View>
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={handleLogout}>Logout</Button>
    </Background>
  );
}
