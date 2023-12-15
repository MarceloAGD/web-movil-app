import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useUserStore } from "../../components/UseUserStore";
import { styles } from "../../constants/style";
import { ENDPOINT_MS_PROJECT, ENDPOINT_MS_TASK } from "@env";
import axios from "axios";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import DatePicker from 'react-native-date-picker'

const addTask: React.FC = () => {
  const { idProject } = useUserStore();
  const storedId = idProject;
  const { email } = useUserStore();
  const [newTaskName, setNewTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open1, set1Open] = useState(false)
  const [open2, set2Open] = useState(false)
  
  const addNewTask = async () => {
    console.log(
      "ENDPOINT_MS_TASK}/createTask en teamsOwner.tsx",
      ENDPOINT_MS_TASK
    );
    const response = await axios.post(`${ENDPOINT_MS_TASK}/createTask`, {
      name: newTaskName,
      emailCreator: email,
      startDate: startDate,
      endDate: endDate,
      idProject: storedId,
    });

    //const user = await axios.post(`${ENDPOINT_MS_USER}/addTeamToUser`, {userId: id, teamId: response.data.idTeam})
    if (response.data.success) {
      console.log("Equipo creado exitosamente");
      Alert.alert("Equipo creado exitosamente");
      // Resto del código para cargar los equipos, etc.
    } else {
      // El equipo ya existe, muestra una alerta.
      Alert.alert(
        "Equipo Existente",
        "El equipo que intentas agregar ya existe."
      );
    }
    setNewTaskName("");
    //setDescription("");
  };

  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={{ marginTop: 50, alignSelf: "center" }}>
        <Header> Add new task </Header>
        <TextInput
          style={styles.input}
          placeholder="Name task"
          value={newTaskName}
          onChangeText={(text) => setNewTaskName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description task"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
       <TextInput
            style={styles.input}
            placeholder="Start date"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
            />
        <TextInput
        style={styles.input}
        placeholder="End date"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
        /></View>
        <Button 
            mode="contained"
          style={{ marginBottom: 10, backgroundColor: theme.colors.primary , width: 200, alignSelf: 'center'}}
          onPress={() => addNewTask()} > add</Button>
      
    </KeyboardAvoidingView>
  );
};

export default addTask;
