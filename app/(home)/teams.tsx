// Importa las librerías necesarias
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../../components/Button";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { IconButton } from "react-native-paper";

const Teams = () => {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState(["Equipo 1", "Equipo 2", "Equipo 3"]);

  const addTeam = () => {
    if (teamName.trim() !== "") {
      setTeams([...teams, teamName]);
      setTeamName("");
    }
  };

  const editTeam = (index: number, newName: string) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = newName;
    setTeams(updatedTeams);
  };

  const deleteTeam = (index: number) => {
    const updatedTeams = [...teams];
    console.log(updatedTeams);
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  return (
    <Background imageSource={require("../../assets/background_5.png")}>
      <View style={styles.container}>
        <Header> Team Management</Header>

        <TextInput
          style={styles.input}
          placeholder="Nombre del equipo"
          value={teamName}
          onChangeText={(text) => setTeamName(text)}
        />
        <Button
          mode="contained"
          style={{ marginBottom: 20, backgroundColor: theme.colors.primary }}
          onPress={addTeam}
        >
          Add team
        </Button>

        {teams.map((team, index) => (
          <View key={index} style={styles.teamItem}>
            <TextInput
              style={styles.input}
              value={team}
              onChangeText={(text) => editTeam(index, text)}
            />
            <button
              onClick={() => deleteTeam(index)}
              style={{
                padding: 1,
                marginLeft: 10,
                marginTop: -10,
                width: "39px",
                height: "39px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                icon="delete"
                size={25}
                iconColor={theme.colors.secondary}
              />
            </button>
          </View>
        ))}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    marginHorizontal: -25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "rgba(255,255, 255, 0.8)",
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Teams;
