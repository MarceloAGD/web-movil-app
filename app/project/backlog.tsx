import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ENDPOINT_MS_PROJECT, ENDPOINT_MS_TASK } from '@env';
import axios from "axios";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";

interface TaskData {
  task:{
    id: string;
    name: string;
    description: string;
  };
}

const backlog: React.FC = () => {
    const router = useRouter();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState('');
    const storedId = useLocalSearchParams<{id: string; storedId?: string }>();
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const { email } = useUserStore(state => state);


    useEffect(() => {
      console.log("tasks:", tasks);
      loadTaskData()
    }, []);
    

    const loadTaskData = async () => {
        try{
            console.log("storedId.id en editProject.tsx",storedId.id);
            console.log("ENDPOINT_MS_PROJECT}/storedId.id en backlog.tsx",ENDPOINT_MS_PROJECT)
            const response = await axios.get(`${ENDPOINT_MS_PROJECT}/${storedId.id}`);
            //setProjectName(response.data.project.name);
            //setDescription(response.data.project.description);
            console.log("tasks en frontend:::", response.data.tasks);  
            setTasks(response.data.tasks);
        }catch(error){
            console.error('error:', error); }
    }

    const addNewTask = async () => {
        console.log("ENDPOINT_MS_TASK}/createTask en teamsOwner.tsx",ENDPOINT_MS_TASK);
        const response = await axios.post(`${ENDPOINT_MS_TASK}/createTask`, {
            name: newTaskName,
            emailCreator: email,
            startDate: new Date(), 
            endDate: new Date(),
            idProject: storedId.id,
          });
          
        //const user = await axios.post(`${ENDPOINT_MS_USER}/addTeamToUser`, {userId: id, teamId: response.data.idTeam})
        if (response.data.success) {
          console.log("Equipo creado exitosamente");
          Alert.alert("Equipo creado exitosamente");
          // Resto del código para cargar los equipos, etc.
        } else {
          // El equipo ya existe, muestra una alerta.
          Alert.alert("Equipo Existente", "El equipo que intentas agregar ya existe.");
        }
        setNewTaskName("");
        //setDescription("");
        
      };

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        <View style={{marginTop: 50}}>
        <TextInput
          style={styles.input}
          placeholder="write the new task name"
          value={newTaskName}
          onChangeText={(text) => setNewTaskName(text)}
        />
        <Button
          mode="contained"
          style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
          onPress={() => {
            if (newTaskName.trim() === '') {
              // El campo de "Name team" está en blanco, muestra una alerta o realiza la acción que desees.
              // Por ejemplo, aquí se muestra una alerta simple:
              Alert.alert('Alerta', 'please enter a task name.');
              
            } else {
              // El campo de "Name team" no está en blanco, puedes crear el equipo.
              addNewTask();
            }
          }}
        >
          Add new task
        </Button>
        </View>  


        <Header> Tasks</Header>
        {loading ? (
          <Text>Loading...</Text>
        ): tasks.length > 0 ?(
            tasks.map((task, index) => (
                <View key={task?.task.id} style={styles.teamItem}>
                    <Text style={{marginRight: 10, fontWeight: 'bold'}}>{index + 1}</Text>
                  <View key={task?.task.id}>                
                    <Text style={styles.title}>Name</Text>
                    <Text>{task?.task.name || 'No Name'}</Text>
                    <Text style={styles.title}>Description</Text>
                    <Text>{task?.task.description || 'No Description'}</Text>
                  </View>
                </View>
            ))
        ): (
            <Text>No hay tareas en el proyecto</Text>
          )}

        </KeyboardAvoidingView>
    )

}
export default backlog;