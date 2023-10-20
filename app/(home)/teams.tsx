import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import Button from "../../components/Button";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
import { ENDPOINT_MS_TEAM, ENDPOINT_MS_AUTH, ENDPOINT_MS_USER } from "@env";
import axios from "axios";
import { useUserStore } from "../../components/UseUserStore";
import { useRouter } from "expo-router";

const Teams = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState('')
  const [teams, setTeams] = useState([]);
  const { accessToken, removeAccessToken } = useUserStore();
  const [id, setId] = useState(0);
  const { email } = useUserStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadUserData();
    loadTeams();
  }, [email]);

  const loadUserData = async () => {
    await axios
      .get(`${ENDPOINT_MS_AUTH}/get-user`, {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((user) => {
        setId(user.data.id);
        setName(user.data.name);
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });
  };

  const loadTeams = async () => {
    try {
      const response = await axios.post(`${ENDPOINT_MS_TEAM}/findTeamsById`, {idCreator: id});
      const teamsData = response.data;
      if (teamsData.length > 0) {
        setTeams(teamsData);
      }
      setLoading(false); // Marca la carga como completada
    } catch (error) {
      console.error("Error loading teams:", error);
      setLoading(false); // Marca la carga como completada en caso de error
    }
  };


  const addTeam = async () => {
    const response = await axios.post(`${ENDPOINT_MS_TEAM}/createTeam`, {name: teamName, description: description, idCreator: id})
    const user = await axios.post(`${ENDPOINT_MS_USER}/addTeamToUser`, {userId: id, teamId: response.data.idTeam})
    setTeamName("");
    setDescription("");
    loadTeams();
  };


  const deleteTeam = async (index: number, idTeam: number) => {
    await axios.post(`${ENDPOINT_MS_USER}/removeTeamUser`, {teamId:idTeam})
    await axios.delete(`${ENDPOINT_MS_TEAM}/remove-team`, {params: {id: idTeam}})
    const updatedTeams = [...teams];
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  return (
      <KeyboardAvoidingView behavior='height' style={styles.container}>
        
      <View style={{marginTop: 50}}>
        <Header> Team Management</Header>
        <TextInput
          style={styles.input}
          placeholder="Name team"
          value={teamName}
          onChangeText={(text) => setTeamName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description team"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          mode="contained"
          style={{ marginBottom: 20, backgroundColor: theme.colors.primary }}
          onPress={addTeam}
        >
          Add team
        </Button>
        </View>
        <Header> Teams of {name}</Header>
        {loading ? (
          <Text>Loading...</Text>
        ) : teams.length > 0 ? (
        teams.map((team, index) => (
          <View key={index} style={styles.teamItem}>
            <TextInput
              style={styles.input}
              value={team.name}
            />
            <TouchableOpacity
              onPress={() => deleteTeam(index, team.id)}
              style={{
                padding: 10,
                paddingRight: 10,
                marginLeft: 10,
                marginTop: -10,
                width: 39,
                height: 39,
                backgroundColor: theme.colors.primary, // Estilo de botón
                borderRadius: 20, // Ajusta según tus preferencias
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton
                icon="delete"
                size={25}
                iconColor={"#fff"}
              />
            </TouchableOpacity>
            </View>
            ))
          ) : (
            <Text>No teams created</Text>
          )}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    overflow: 'scroll', /* Agrega barras de desplazamiento si es necesario */
    padding: 20,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: -25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Teams;
