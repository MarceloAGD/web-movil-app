import React, { useEffect, useState, useCallback} from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
//import { ENDPOINT_MS_PROJECT, ENDPOINT_MS_TASK } from '@env';
import axios from "axios";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";
import { IconButton } from "react-native-paper";

interface TaskData {
    id: string;
    name: string;
    description: string;
    emailCreator: string;
}

const backlog: React.FC = () => {
    const project_url = process.env.ENDPOINT_MS_PROJECT;
    const task_url = process.env.ENDPOINT_MS_TASK;
    const router = useRouter();
    const {idProject} = useUserStore();
    const storedId = idProject;
    const [tareas, setTareas] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const { email } = useUserStore();

    useFocusEffect(
      useCallback(() => {
        loadTaskData();
      }, [])
    );

    const loadTaskData = async () => {
      try{
          const response = await axios.get(`${project_url}/${storedId}`);
          console.log(response.data.tasks)
          await setTareas(response.data.tasks);
      }catch(error){
          console.error('error:', error); }
  }
    
    const deletetask = async (idtask: string) => {
      try{
          console.log("ENDPOINT_MS_PROJECT}/deleteTeam en editProject.tsx",task_url);
          const queryResponse = await axios.post(`${task_url}/remove-task`, {
            idProject: storedId,
            idTask: idtask,
          });
          
          if(queryResponse){
              console.log("se ha eliminado la tarea!");
              Alert.alert("tarea eliminado con exito");
              loadTaskData();
          }else{
              console.log("error eliminando a la tarea");
          }

      }catch(error){
          console.error('error:', error);
      }
  }
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        <View style={{marginTop: 50, alignSelf: 'center'}}>
          <Header> Backlog </Header>
        <Button
          mode="contained"
          style={{ marginBottom: 10, backgroundColor: theme.colors.primary , width: 200}}
          onPress={() => router.push('/task/addTask')} >
          Add new task              
        </Button>
         


        <Header> Tasks</Header>
        {loading ? (
          <Text>Loading...</Text>
        ): tareas.length > 0 ?(
            tareas.map((task, index) => (
                <View key={task?.id} style={styles.teamItem}>
                    <Text style={{marginRight: 10, fontWeight: 'bold'}}>{index + 1}</Text>
                  <View key={task?.id}>                
                    <Text style={styles.title}>Name</Text>
                    <Text>{task?.name || 'No Name'}</Text>
                    <Text style={styles.title}>Description</Text>
                    <Text>{task?.description || 'No Description'}</Text>
                  </View>
                <TouchableOpacity
                  onPress={() => deletetask(task?.id)}
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
            <Text>No hay tareas en el proyecto</Text>
          )}
          </View>           

        </KeyboardAvoidingView>
    )

}
export default backlog;