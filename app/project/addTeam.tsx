import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";
import axios from "axios";
import {ENDPOINT_MS_TEAM, ENDPOINT_MS_PROJECT} from '@env';
import { useRouter, useLocalSearchParams } from "expo-router";


const addTeam: React.FC = () => {

    const router = useRouter();

    const [newTeamName, setNewTeamName] = useState("");

    const storedIdProject = useLocalSearchParams<{id: string; storedIdProject?: string }>();
    
    

    useEffect(() => {

    })

    const addNewTeam = async () => {
        
        try{
            console.log("storedIdTeam en addTeam/en el try", storedIdProject);
            //TODO: veridicar que el correo exista en la base de datos de usuarios
            const queryResponse = await axios.post(`${ENDPOINT_MS_PROJECT}/addTeam`, {
            nameNewTeam: newTeamName,
            idProject: storedIdProject.id,

            });
            
            if(queryResponse.data.success){
                console.log("se ha añadido el nuevo team al proyecto");
                Alert.alert("team añadido con exito");
                setTimeout(() => {
                    router.back();
                  }, 2500);

            }else{
                console.log("error añadiendo al nuevo team");
                setTimeout(() => {
                    router.back();
                  }, 2500);
            }

        }catch(error){
            console.error('error:', error);
        }
        
        

    }

    return(
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style={{marginTop: 50}}>
            <Header> Add Team</Header>
            <TextInput
            style={styles.input}
            placeholder="new Team Name"
            value={newTeamName}
            onChangeText={(text) => setNewTeamName(text)}
            />
            </View>
            <Button
            mode="contained"
            style={{ marginBottom: 20, backgroundColor: theme.colors.primary }}
            onPress={() => {
                addNewTeam();
              
            }}
            disabled={newTeamName.trim() === ''}
            >
                Add new Team
            </Button>
            
        </KeyboardAvoidingView> 
    )
    



}
export default addTeam;