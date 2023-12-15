import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import { styles } from '../../constants/style';
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import {ENDPOINT_MS_PROJECT, ENDPOINT_MS_TEAM} from '@env';
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
import Button from "../../components/Button";

interface Project {
    id: string;
    name: string;
    description: string;
  }
  
  interface TeamData {
    team:{
      id: string;
      name: string;
      description: string;
    };
  }
 


const EditProject: React.FC = () => {
    const router = useRouter();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState('');
    const storedId = useLocalSearchParams<{id: string; storedId?: string }>();
    const [project, setProject] = useState<Project| null>(null);
    const [teams, setTeams] = useState<TeamData[]>([]);
    //const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadProjectData();
    }, [])

    const loadProjectData = async () => {
        try{
            console.log("storedId.id en editProject.tsx",storedId.id);
            console.log("ENDPOINT_MS_PROJECT}/storedId.id en editProject.tsx",ENDPOINT_MS_PROJECT)
            const response = await axios.get(`${ENDPOINT_MS_PROJECT}/${storedId.id}`);
            console.log("response::", response.data);
            if (response.data && response.data.project) {
              console.log("entro al if");
              setProject(response.data.project);
              if (response.data.project.name) {
                setProjectName(response.data.project.name);
              }
              setProject(response.data.project);
              setProjectName(response.data.project.name);
              setDescription(response.data.project.description);
              setTeams(response.data.teams);
              //setTasks(response.data.tasks);
            }else{
              console.error('El proyecto no está definido en la respuesta');
            }  
        console.log("response.data", response.data);
        }catch(error){
            console.error('error:', error); }
    }

    const deleteteam = async (idteam: string) => {
        try{
            console.log("ENDPOINT_MS_PROJECT}/deleteTeam en editProject.tsx",ENDPOINT_MS_PROJECT);
            const queryResponse = await axios.post(`${ENDPOINT_MS_PROJECT}/deleteTeam`, {
            idTeam: idteam,
            idProject: storedId.id,

            });
            
            if(queryResponse){
                console.log("se ha eliminado el equipo!");
                Alert.alert("equipo eliminado con exito");
                loadProjectData();
            }else{
                console.log("error eliminando al equipo");
            }

        }catch(error){
            console.error('error:', error);
        }
    }
    const updateProject = async () => {
        if (isSaving) {
          return; // Evita que se ejecute la solicitud si ya está en curso
        }
    
        try {
          setIsSaving(true); // Inicia la solicitud
          console.log("ENDPOINT_MS_PROJECT}/update-project en editProject.tsx",ENDPOINT_MS_PROJECT);
          const queryResponse = await axios.patch(`${ENDPOINT_MS_PROJECT}/update-project`, {
            id: storedId.id,
            name: projectName,
            description: description,
          });
    
          if (queryResponse) {
            console.log("se ha actualizado el proyecto!");
            Alert.alert("Proyecto actualizado con éxito");
            router.replace('/(home)/projects');
          } else {
            console.log("error actualizando el proyecto");
          }
        } catch (error) {
          console.error('error:', error);
        } finally {
          setIsSaving(false); // Completa la solicitud, ya sea con éxito o con error
        }
      };
    return(
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        
        <View style={{marginTop: 50}}>
        <Header> {project?.name}</Header>
        <TextInput
              style={styles.input}
              placeholder="Name"
              value={projectName}
              onChangeText={(text) => setProjectName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <Button mode="contained"
                style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
                onPress={() => updateProject()}>Save</Button>

            <Button
            mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            onPress={() => router.push(`/project/backlog?id=${storedId.id}`)}>backlog</Button>  


        <Header> Teams</Header>
        {loading ? (
          <Text>Loading...</Text>
        ): teams.length > 0 ?(
            teams.map((team, index) => (
                <View key={team?.team.id} style={styles.teamItem}>
                    <Text style={{marginRight: 10, fontWeight: 'bold'}}>{index + 1}</Text>
                  <View key={team?.team.id}>                
                    <Text style={styles.title}>Name</Text>
                    <Text>{team?.team.name}</Text>
                  </View>
                <TouchableOpacity
              onPress={() => deleteteam(team?.team.id)}
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
        ): (
            <Text>No hay equipos en el proyecto</Text>
          )}

        
        </View>
        </KeyboardAvoidingView>
    )
}

export default EditProject;