import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ENDPOINT_MS_PROJECT, ENDPOINT_MS_TASK } from '@env';
import axios from "axios";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";

interface TaskData {
    id: string;
    name: string;
    description: string;
    emailCreator: string;
}

const backlog: React.FC = () => {
    const router = useRouter();
    const {idProject} = useUserStore();
    const storedId = idProject;
    const [tareas, setTareas] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const { email } = useUserStore();

    useEffect(() => {
      const loadTaskData = async () => {
        try{
            const response = await axios.get(`${ENDPOINT_MS_PROJECT}/${storedId}`);
            console.log(response.data.tasks)
            await setTareas(response.data.tasks);
        }catch(error){
            console.error('error:', error); }
    }
      loadTaskData()
      console.log(tareas)
    }, []);
    
    

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