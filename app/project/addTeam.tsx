import React, { useEffect, useState, useCallback} from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import { styles } from "../../constants/style";
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";
import axios from "axios";
import { ENDPOINT_MS_TEAM, ENDPOINT_MS_PROJECT } from "@env";
import { SelectList } from 'react-native-dropdown-select-list';

interface team {
  id: number;
  name: string;
  description: string;
  idCreator: number;
}

const addTeam: React.FC = () => {
  const router = useRouter();
  const { idProject } = useUserStore();
  const [newTeamName, setNewTeamName] = useState("");

  const storedIdProject = idProject;

  const [teams, setTeams] = useState<team[]>([]);

  useEffect(() => {
    loadteams();
  }, []);

  const loadteams = async () => {
      const teams = await axios.get(`${ENDPOINT_MS_TEAM}/teams`);
      setTeams(teams.data);
    };
  const addNewTeam = async (newTeamName: string) => {
    try {
      const queryResponse = await axios.post(`${ENDPOINT_MS_PROJECT}/addTeam`, {
        nameNewTeam: newTeamName,
        idProject: storedIdProject,
      });

      if (queryResponse.data.success) {
        console.log("se ha añadido el nuevo team al proyecto");
        Alert.alert("team añadido con exito");
        setTimeout(() => {
          router.back();
        }, 2500);
      } else {
        console.log("error añadiendo al nuevo team");
        setTimeout(() => {
          router.back();
        }, 2500);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={{ marginTop: 50, alignSelf: "center" }}>
        <Header> Add Team</Header>
        <SelectList
            setSelected={(value: string) => setNewTeamName(value)}
            save="value"
            data={teams.map((team) => ({key: team.id, value: team.name }))}
        />

        <Button
          mode="contained"
          style={{ marginTop: 20, backgroundColor: theme.colors.primary, width: 200}}
          onPress={() => {
            addNewTeam(newTeamName);
          }}
        >
          Add new Team
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
export default addTeam;
