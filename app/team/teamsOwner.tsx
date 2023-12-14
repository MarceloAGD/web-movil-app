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


const TeamsOwner: React.FC = () => {
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
    console.log("print de id en useEffect", id);
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
    console.log("ENDPOINT_MS_AUTH}/get-user en teamsOwner.tsx",ENDPOINT_MS_AUTH);
    await axios
      .post(`${ENDPOINT_MS_AUTH}/get-user`, {email})
      .then((user) => {

        setId(user.data.id);

        setName(user.data.name);
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });

      
  };

  const loadTeams = async (id: number) => {
    try {
      console.log("ENDPOINT_MS_TEAM}/findTeamsById en teamsOwner.tsx",ENDPOINT_MS_TEAM);
      const response = await axios.post(`${ENDPOINT_MS_TEAM}/findTeamsById`, {idCreator: id});
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


  const addTeam = async () => {
    console.log("ENDPOINT_MS_TEAM}/createTeam en teamsOwner.tsx",ENDPOINT_MS_TEAM);
    const response = await axios.post(`${ENDPOINT_MS_TEAM}/createTeam`, {name: teamName, description: description, idCreator: id})
    //const user = await axios.post(`${ENDPOINT_MS_USER}/addTeamToUser`, {userId: id, teamId: response.data.idTeam})
    if (response.data.success) {
      console.log("Equipo creado exitosamente");
      Alert.alert("Equipo creado exitosamente");
      // Resto del código para cargar los equipos, etc.
    } else {
      // El equipo ya existe, muestra una alerta.
      Alert.alert("Equipo Existente", "El equipo que intentas agregar ya existe.");
    }
    setTeamName("");
    setDescription("");
    if (id !== undefined) {
      loadTeams(id);
    }
  };


  const deleteTeam = (index: number, idTeam: number) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este equipo?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            // El usuario canceló la eliminación, no hagas nada.
          },
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            // El usuario confirmó la eliminación, procede a eliminar el equipo.
            console.log("ENDPOINT_MS_TEAM}/remove-team en teamsOwner.tsx",ENDPOINT_MS_TEAM);
            await axios.post(`${ENDPOINT_MS_TEAM}/remove-team/${idTeam}`)
            
            // Actualiza la lista de equipos después de eliminar el equipo.
            const updatedTeams = [...teams];
            updatedTeams.splice(index, 1);
            setTeams(updatedTeams);
          },
        },
      ]
    );
  };
  

  interface Team {
    id: number;
    name: string;
  }
  
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
          style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
          onPress={() => {
            if (teamName.trim() === '') {
              // El campo de "Name team" está en blanco, muestra una alerta o realiza la acción que desees.
              // Por ejemplo, aquí se muestra una alerta simple:
              Alert.alert('Alerta', 'Por favor, ingresa un nombre de equipo.');
              
            } else {
              // El campo de "Name team" no está en blanco, puedes crear el equipo.
              addTeam();
            }
          }}
        >
          Add team
        </Button>
        </View>
        <Header> Teams of {name}</Header>
        {loading ? (
          <Text>Loading...</Text>
        ) : teams.length > 0 ? (
        teams.map((team: Team, index) => (
          <View key={index} style={styles.teamItem}>
            <Button
            mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            onPress={() => router.push(`/team/editTeam?id=${team.id}`)}>
            {team.name}
            </Button>
            <Link
              href={ `/team/addMember?id=${team.id}`}
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
              <Icon
                name="user-plus"
                size={15}
                color={"#fff"}
              />
            </Link>

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

export default TeamsOwner;
