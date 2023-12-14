import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useRouter } from "expo-router";
import { ENDPOINT_MS_AUTH, ENDPOINT_MS_USER} from '@env';
import Background from "../../components/Background";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import container from "../../constants/container";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";
import { Text } from "../../components/Themed";
import { styles } from '../../constants/style';

export default function EditProfile() {
  const router = useRouter();
  const { accessToken, setAccessToken, email } = useUserStore();
  const [name, setName] = useState('');
  //const [userName, setUserName] = useUserStore();
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [changePassword, setChangePassword] = useState(false); // Estado para mostrar u ocultar los campos de cambio de contraseña
  const [oldPassword, setOldPassword] = useState(""); // Contraseña antigua
  const [newPassword, setNewPassword] = useState(""); // Contraseña nueva

  useEffect(() => {
    
    axios
      .post(`${ENDPOINT_MS_AUTH}/get-user`, { email })/*
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
      console.log("ENDPOINT_MS_USER}/update-user en edit-profile.tsx",ENDPOINT_MS_USER)  
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
      useUserStore.setState({
        email: email,
        userName: name,
      })

      
      setError('Profile update!!');

      setTimeout(() => {
        router.replace('/(home)/user');
      }, 3000);
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      console.log("ENDPOINT_MS_USER}/update-password en edit-profile.tsx",ENDPOINT_MS_USER)
      const isUpdated = await axios.post(
        `${ENDPOINT_MS_USER}/update-password`,
        {
          email,
          oldPassword,
          newPassword,
        }
      );
      console.log("isUpdated?:",isUpdated);
      if(isUpdated.data){
        setError('password updated');
      }if(!isUpdated.data){
        setError('error updating password');
      }
      
      setTimeout(() => {
        router.replace('/(home)/user');
      }, 3000);
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  const setChangePasswordAndsetError = async () => {
    setChangePassword(!changePassword);
    setError('');
  };

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={{marginTop: 50}}>
 
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
              Save Password
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
          onPress={setChangePasswordAndsetError}
        >
          {changePassword ? "Cancel" : "Change Password"}
        </Button>
        <Text style={{color: theme.colors.primary}}>{error}</Text>
      </View>
      </KeyboardAvoidingView>
  );
}