import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
import { ENDPOINT_MS_AUTH, ENDPOINT_MS_USER, ENDPOINT_MS_TEAM} from "@env";
import axios from "axios";
import { useUserStore } from "../../components/UseUserStore";
import { useRouter, Link } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../constants/style';


const TeamsMember: React.FC = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState('')
  const [teams, setTeams] = useState([]);
  const { accessToken, removeAccessToken } = useUserStore();
  const [id, setId] = useState();
  const { email } = useUserStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadUserData();
    if (id !== undefined) {
      loadTeams(id);
    }
  }, [email, id]);

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
    console.log("ENDPOINT_MS_AUTH}/get-user en teamsMember.tsx",ENDPOINT_MS_AUTH);  
    await axios
      .post(`${ENDPOINT_MS_AUTH}/get-user`, {email})
      .then((user) => {
        console.log("-----");
        console.log(user.data.id)
        setId(user.data.id);
        console.log("id guardado con setId",id);
        console.log("deberia ser marcelo")
        console.log(user.data.name);
        console.log();
        setName(user.data.name);
        console.log(user.data.name);
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });

      
  };

  const loadTeams = async (id: number) => {
    try {
      console.log("ENDPOINT_MS_TEAM}/findTeamsByMemberId en teamsMember.tsx",ENDPOINT_MS_TEAM);
      const response = await axios.post(`${ENDPOINT_MS_TEAM}/findTeamsByMemberId`, {idCreator: id});
      //const response = await axios.post('http://10.181.135.64:4002/teams/findTeamsById', {idCreator: id});
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




  interface Team {
    id: number;
    name: string;
  }
  
  return (
      <View style={styles.container}>
        <View style={{marginTop: 50, alignSelf: 'center'}}>
        <Header> Teams</Header>
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : teams.length > 0 ? (
        teams.map((team: Team, index) => (
          <View key={index} style={styles.teamItem}>
            <Text style={{marginRight: 10, fontWeight: 'bold',}}>{index + 1}</Text>
            <Button
            mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            >
            {team.name}
            </Button>

            </View>
            ))
          ) : (
            <Text>Not a member of a team</Text>
          )}
        </View>
  );
};

export default TeamsMember;
