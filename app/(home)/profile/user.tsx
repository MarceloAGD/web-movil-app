import { useRouter } from "expo-router";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { IconButton } from 'react-native-paper';
import { useUserStore } from "../../../components/UseUserStore";
import { theme } from "../../../constants/theme";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT_MS_AUTH } from "@env";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function User() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const { accessToken, removeAccessToken } = useUserStore();
  const { email } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [email]);

  const loadUserData = async () => {
    /*
    await axios
      .get(`${ENDPOINT_MS_AUTH}/get-user`, {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })*/
      await axios
      .post(`${ENDPOINT_MS_AUTH}/get-user`, { email })
      .then((user) => {
        setName(user.data.name);
        setLastname(user.data.lastname);
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });
  };

  
  const handleLogout = async () => {
    try {
      await removeAccessToken();
      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    setIsEditing(!isEditing);
  };

  return (
    <Background imageSource={require("../../../assets/background_5.png")}>
      <View style={styles.container}>
      <IconButton
          icon="account" 
          size={200}
          iconColor={theme.colors.primary}
        />
        <Text style={styles.emailText}>{email}</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.nameText}>{lastname}</Text>
        </View>
        <Button
          style={{backgroundColor: theme.colors.primary }}
          mode="contained"
          onPress={() => router.push('/edit-profile')}
        >
          Edit profile
        </Button>

        <Button textColor={theme.colors.primary} mode="outlined" onPress={handleLogout}>Logout</Button>

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },

  logoutText: {
    fontSize: 16,
    color: "#007AFF", // Color de texto personalizable
    marginTop: 10,
  },
});
