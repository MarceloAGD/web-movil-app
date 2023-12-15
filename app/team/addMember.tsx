import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import axios from "axios";
import {ENDPOINT_MS_TEAM} from '@env';
import { useRouter, useLocalSearchParams } from "expo-router";

const addMember: React.FC = () => {

    const router = useRouter();

    const [newMemberEmail, setNewMemberEmail] = useState("");

    const storedIdTeam = useLocalSearchParams<{id: string; storedIdTeam?: string }>();

    useEffect(() => {
        loadTeamData();
    }, [])
    const loadTeamData = async () => {
        try{
            console.log("ENDPOINT_MS_TEAM}/storedIdTeam.id en addMember.tsx",ENDPOINT_MS_TEAM);
            const response = await axios.get(`${ENDPOINT_MS_TEAM}/${storedIdTeam.id}`);
        console.log("response.data", response.data);
        }catch(error){
            console.error('error:', error); }
    }
    const addNewMember = async () => {
        
        try{
            //TODO: veridicar que el correo exista en la base de datos de usuarios
            console.log("ENDPOINT_MS_TEAM}/addMember en addMember.tsx",ENDPOINT_MS_TEAM);
            const queryResponse = await axios.post(`${ENDPOINT_MS_TEAM}/addMember`, {
            emailNewMember: newMemberEmail,
            idTeam: storedIdTeam.id,

            });
            
            if(queryResponse.data.success){
                console.log("se ha añadido el nuevo miembro al team!");
                Alert.alert("miembro añadido con exito");
                setTimeout(() => {
                    router.back();
                  }, 2500);

            }else{
                console.log("error añadiendo al nuevo miembro");
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
            <Header> Add Member</Header>
            <TextInput
            style={styles.input}
            placeholder="new member email"
            value={newMemberEmail}
            onChangeText={(text) => setNewMemberEmail(text)}
            />
            </View>
            <Button
            mode="contained"
            style={{ marginBottom: 20, backgroundColor: theme.colors.primary }}
            onPress={() => {
                addNewMember();
              
            }}
            disabled={newMemberEmail.trim() === ''}
            >
                Add new member
            </Button>
            
        </KeyboardAvoidingView> 
    )
    



}
export default addMember;