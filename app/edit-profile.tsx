import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useRouter } from "expo-router";
import { ENDPOINT_MS_AUTH, ENDPOINT_MS_USER} from '@env';
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { TextInput, View } from "react-native";
import container from "../constants/container";
import { theme } from "../constants/theme";
import { useUserStore } from "../components/UseUserStore";
import { Text } from "../components/Themed";

export default function EditProfile() {
  const router = useRouter();
  const { accessToken, setAccessToken, email } = useUserStore();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [changePassword, setChangePassword] = useState(false); // Estado para mostrar u ocultar los campos de cambio de contraseña
  const [oldPassword, setOldPassword] = useState(""); // Contraseña antigua
  const [newPassword, setNewPassword] = useState(""); // Contraseña nueva

  useEffect(() => {
    
    axios
      .get(`${ENDPOINT_MS_AUTH}/get-user`, {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })/*
      axios.get('http://10.181.135.64:4001/user/get-user', {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })*/
      .then((user) => {
        setName(user.data.name);
        setLastname(user.data.lastname);   
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });
  }, [email]);
  
  const handleUpdateProfile = async () => {
    try {
      
      await axios.post(
        `${ENDPOINT_MS_USER}/update-user`,
        {
          name: name,
          lastname: lastname,
          email: email,
        }/*
        await axios.post(
          'http://10.181.135.64:4001/user/update-user',
          {
            name: name,
            lastname: lastname,
            email: email,
          }*/
      );

      
      setError('Profile update!!');
      router.replace('/(home)/profile/user');
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.post(
        `${ENDPOINT_MS_USER}/update-password`,
        {
          email,
          oldPassword,
          newPassword,
        }
      );
      router.replace('/(home)/profile/user');
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Background imageSource={require("../assets/background_5.png")}>
      <View
        style={{
          marginBottom: 130,
          marginTop: 130,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 15,
        }}
      >
        <Header>Edit Profile</Header>
        {changePassword ? (
          <>
            <Text style={container.title}>Old Password</Text>
            <TextInput
              style={container.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
            <Text style={container.title}>New Password</Text>
            <TextInput
              style={container.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Button
              style={{ backgroundColor: theme.colors.primary }}
              mode="contained"
              onPress={handleChangePassword}
            >
              Change Password
            </Button>
          </>
        ) : (
          <>
            <Text style={container.title}>Name</Text>
            <TextInput
              style={container.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={container.title}>Lastname</Text>
            <TextInput
              style={container.input}
              placeholder="Lastname"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
            <Button
              style={{ backgroundColor: theme.colors.primary }}
              mode="contained"
              onPress={handleUpdateProfile}
            >
              Save
            </Button>
          </>
        )}
        <Button
          textColor={theme.colors.primary}
          mode="outlined"
          onPress={() => setChangePassword(!changePassword)}
        >
          {changePassword ? "Cancel" : "Change Password"}
        </Button>
        <Text style={{color: theme.colors.primary}}>{error}</Text>
      </View>
    </Background>
  );
}