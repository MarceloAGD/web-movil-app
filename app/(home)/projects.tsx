import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
import { ENDPOINT_MS_AUTH, ENDPOINT_MS_USER, ENDPOINT_MS_TEAM, ENDPOINT_MS_PROJECT} from "@env";
import axios from "axios";
import { useUserStore } from "../../components/UseUserStore";
import { useRouter, Link } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../constants/style';


export default function TabOneScreen() {

  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState('')
  const [projects, setProjects] = useState([]);
  const { accessToken, removeAccessToken } = useUserStore();
  const [id, setId] = useState();
  const { email } = useUserStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);



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
      .post(`${ENDPOINT_MS_AUTH}/get-user`, {email})
      .then((user) => {
        console.log("-----");
        console.log(user.data.id)
        setId(user.data.id);
        
        
        setName(user.data.name);
        if (user.data.id !== undefined) {
          loadProjects(user.data.id);
        }
      })
      .catch((error) => {
        console.error("Error getting user information:", error);
      });

      
  };

  const loadProjects = async (id: number) => {
    try {
      console.log("print de id en loadProjects");
      console.log("id que recibe loadProjects:", id) 
      const response = await axios.post(`${ENDPOINT_MS_PROJECT}/findProjectsById`, {idCreator: id});
      //const response = await axios.post('http://10.181.135.64:4002/teams/findTeamsById', {idCreator: id});
      const projectsData = response.data;

      const responseProjectsMember = await axios.post(`${ENDPOINT_MS_PROJECT}/findProjectsByMemberId`, {idCreator: id});
      const projectsMemberData = responseProjectsMember.data;

      

      if (projectsData.length > 0) {
        setProjects(projectsData);
      }
      setLoading(false); // Marca la carga como completada
    } catch (error) {
      console.error("Error loading teams:", error);
      setLoading(false); // Marca la carga como completada en caso de error
    }
  };

  const deleteProject = (index: number, idProject: number) => {
   
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este proyecto?",
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
            
            await axios.post(`${ENDPOINT_MS_PROJECT}/remove-project/${idProject}`)
            
            // Actualiza la lista de equipos después de eliminar el equipo.
            const updatedProjects = [...projects];
            updatedProjects.splice(index, 1);
            setProjects(updatedProjects);
          },
        },
      ]
    );
  };

  const addProject = async () => {
    const response = await axios.post(`${ENDPOINT_MS_PROJECT}/createProject`, {name: projectName, description: description, idCreator: id})
    //const user = await axios.post(`${ENDPOINT_MS_USER}/addProjectToUser`, {userId: id, teamId: response.data.idTeam})
    if (response.data.success) {
      console.log("Proyecto creado exitosamente");
      Alert.alert("Proyecto creado exitosamente");
      // Resto del código para cargar los equipos, etc.
    } else {
      // El equipo ya existe, muestra una alerta.
      Alert.alert("Proyecto Existente", "El proyecto que intentas agregar ya existe.");
    }
    setProjectName("");
    setDescription("");
    if (id !== undefined) {
      loadProjects(id);
    }
  };

  interface Project {
    id: number;
    name: string;
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
    <View style={{marginTop: 50}}>
        <Header> Project Management</Header>
        <TextInput
          style={styles.input}
          placeholder="Name project"
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description project"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          mode="contained"
          style={{ marginBottom: 20, backgroundColor: theme.colors.primary }}
          onPress={() => {
            if (projectName.trim() === '') {
              // El campo de "Name team" está en blanco, muestra una alerta o realiza la acción que desees.
              // Por ejemplo, aquí se muestra una alerta simple:
              Alert.alert('Alerta', 'Por favor, ingresa un nombre de equipo.');
              
            } else {
              // El campo de "Name team" no está en blanco, puedes crear el equipo.
              addProject();
            }
          }}
        >
          Add Project
        </Button>
        </View>
        <Header> Projects of {name}</Header>
        {loading ? (
          <Text>Loading...</Text>
        ) : projects.length > 0 ? (
        projects.map((project: Project, index) => (
          <View key={index} style={styles.teamItem}>
            <Button
            mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            onPress={() => router.push(`/project/editProject?id=${project.id}`)}>
            {project.name}
            </Button>
            
             
            <Link
              href={{
                pathname: '/project/addTeam',
                params: {id: project.id},
              }}
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
              onPress={() => deleteProject(index, project.id)}
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
            <Text>No projects created</Text>
          )}
      
      </KeyboardAvoidingView>
  );
}
