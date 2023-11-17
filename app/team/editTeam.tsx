import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import { styles } from '../../constants/style';
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import {ENDPOINT_MS_TEAM} from '@env';
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
const EditTeam: React.FC = () => {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState('');
    const storedIdTeam = useLocalSearchParams<{id: string; storedIdTeam?: string }>();
    const [team, setTeam] = useState();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadTeamData();
    }, [])
    const loadTeamData = async () => {
        try{
            const response = await axios.get(`${ENDPOINT_MS_TEAM}/${storedIdTeam.id}`);
            setTeam(response.data.team);
            setTeamName(response.data.team.name);
            setDescription(response.data.team.description);
            setMembers(response.data.membersInfo);
        console.log("response.data", response.data);
        }catch(error){
            console.error('error:', error); }
    }

    const deleteMember = async (idMember: string) => {
        try{
            const queryResponse = await axios.post(`${ENDPOINT_MS_TEAM}/deleteMember`, {
            idMember: idMember,
            idTeam: storedIdTeam.id,

            });
            
            if(queryResponse){
                console.log("se ha eliminado el miembro!");
                Alert.alert("miembro eliminado con exito");
                loadTeamData();
            }else{
                console.log("error eliminando al miembro");
            }

        }catch(error){
            console.error('error:', error);
        }
    }
    return(
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        
        <View style={{marginTop: 50}}>
        <Header> {team?.name}</Header>
        <TextInput
              style={styles.input}
              placeholder="Name"
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
        <Header> Members of {teamName}</Header>
        {loading ? (
          <Text>Loading...</Text>
        ): members.length > 0 ?(
            members.map((member, index) => (
                <View key={member?.id} style={styles.teamItem}>
                    <Text style={{marginRight: 10}}>{index + 1}</Text>
                  <View key={member?.id}>
                    
                    <Text style={styles.title}>Name</Text>
                    <Text>{member?.name}</Text>
                    <Text style={styles.title}>Email</Text>
                    <Text>{member?.email}</Text>
                  </View>
                <TouchableOpacity
              onPress={() => deleteMember(member?.id)}
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
            <Text>No hay miembros en el equipo</Text>
          )}
        </View>
        </KeyboardAvoidingView>
    )
}

export default EditTeam