import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Header from "../components/Header";
import { styles } from '../constants/style';
import Button from "../components/Button";
import { theme } from "../constants/theme";
import { useUserStore } from "../components/UseUserStore";
import axios from "axios";
import {ENDPOINT_MS_TEAM} from '@env';
import { useRouter } from "expo-router";


const addMember: React.FC = () => {

    const router = useRouter();
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const storedIdTeam = useUserStore(state => state.idTeam);

    useEffect(() => {

    })

    const addNewMember = async () => {
        
        try{
            //TODO: veridicar que el correo exista en la base de datos de usuarios
            const queryResponse = await axios.post(`${ENDPOINT_MS_TEAM}/addMember`, {
            emailNewMember: newMemberEmail,
            idTeam: storedIdTeam,

            });
            
            if(queryResponse.data.success){
                console.log("se ha añadido el nuevo miembro al team!");
                Alert.alert("miembro añadido con exito");
                setTimeout(() => {
                    router.replace('/(home)/teams');
                  }, 2500);

            }else{
                console.log("error añadiendo al nuevo miembro");
                setTimeout(() => {
                    router.replace('/(home)/teams');
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