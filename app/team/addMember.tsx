import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";
import Header from "../../components/Header";
import { styles } from '../../constants/style';
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import axios from "axios";
//import {ENDPOINT_MS_TEAM} from '@env';
import { useRouter, useLocalSearchParams } from "expo-router";
import { SelectList } from 'react-native-dropdown-select-list';

interface User{
    id: number;
    name: string;
    email: string;
}

const addMember: React.FC = () => {
    const team_url = process.env.ENDPOINT_MS_TEAM;
    const ENDPOINT_MS_USER = process.env.ENDPOINT_MS_USER;
    const router = useRouter();
    const [user, setUser]= useState<User[]>([]);
    const [newMemberEmail, setNewMemberEmail] = useState("");

    const storedIdTeam = useLocalSearchParams<{id: string; storedIdTeam?: string }>();

    useEffect(() => {
        loadTeamData();
        loadUser();
    }, [])
    const loadTeamData = async () => {
        try{
            console.log("ENDPOINT_MS_TEAM}/storedIdTeam.id en addMember.tsx", team_url);
            const response = await axios.get(`${team_url}/${storedIdTeam.id}`);
        console.log("response.data", response.data);
        }catch(error){
            console.error('error:', error); }
    }

    const loadUser = async () => {
        const user = await axios.get(`${ENDPOINT_MS_USER}/users`);
        setUser(user.data);
      };


    const addNewMember = async () => {
        
        try{
            //TODO: veridicar que el correo exista en la base de datos de usuarios
            console.log("ENDPOINT_MS_TEAM}/addMember en addMember.tsx",team_url);
            const queryResponse = await axios.post(`${team_url}/addMember`, {
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
            <View style={{marginTop: 50, alignSelf: 'center'}}>
            <Header> Add Member</Header>
            <SelectList
            setSelected={(value: string) => setNewMemberEmail(value)}
            save="value"
            data={user.map((user) => ({key: user.id, value: user.email }))}
        />
            
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
            </View>
        </KeyboardAvoidingView> 
    )
    



}
export default addMember;