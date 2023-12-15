import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View, TextInput, Text, Alert, TouchableOpacity} from "react-native"
import { styles } from '../../constants/style';
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import {ENDPOINT_MS_TEAM} from '@env';
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";
import Button from "../../components/Button";

interface Member {
    id: string;
    name: string;
    email: string;
  }
  
  interface TeamData {
    id: string;
    name: string;
    description: string;
  }

const EditTeam: React.FC = () => {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState('');
    const storedIdTeam = useLocalSearchParams<{id: string; storedIdTeam?: string }>();
    const [team, setTeam] = useState<TeamData | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadTeamData();
    }, [])

    const loadTeamData = async () => {
        try{
            console.log("ENDPOINT_MS_TEAM}/storedIdTeam.id en editTeam.tsx",ENDPOINT_MS_TEAM);
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
            console.log("ENDPOINT_MS_TEAM}/deleteMember en editTeam.tsx",ENDPOINT_MS_TEAM);
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
    const updateTeam = async () => {
        if (isSaving) {
          return; // Evita que se ejecute la solicitud si ya está en curso
        }
    
        try {
          setIsSaving(true); // Inicia la solicitud
          console.log("ENDPOINT_MS_TEAM}/update-team en editTeam.tsx",ENDPOINT_MS_TEAM);
          const queryResponse = await axios.patch(`${ENDPOINT_MS_TEAM}/update-team`, {
            id: storedIdTeam.id,
            name: teamName,
            description: description,
          });
    
          if (queryResponse) {
            console.log("se ha actualizado el equipo!");
            Alert.alert("equipo actualizado con éxito");
            router.replace('/(home)/teams');
          } else {
            console.log("error actualizando el equipo");
          }
        } catch (error) {
          console.error('error:', error);
        } finally {
          setIsSaving(false); // Completa la solicitud, ya sea con éxito o con error
        }
      };
    return(
        <KeyboardAvoidingView behavior='height' style={styles.container}>
        
        <View style={{marginTop: 50, alignSelf: 'center'}}>
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
            <Button mode="contained"
                style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
                onPress={() => updateTeam()}>Save</Button>

        <Header> Members</Header>
        {loading ? (
          <Text>Loading...</Text>
        ): members.length > 0 ?(
            members.map((member, index) => (
                <View key={member?.id} style={styles.teamItem}>
                    <Text style={{marginRight: 10, fontWeight: 'bold'}}>{index + 1}</Text>
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