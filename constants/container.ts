import { StyleSheet } from "react-native";
import { theme } from "./theme";

const container= StyleSheet.create({
    button: {
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:"rgba(255,255, 255, 0.8)",
      marginBottom: 150,
      paddingTop: 20,
      borderRadius: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      textAlign: 'left',
      alignSelf: 'flex-start',
      color: theme.colors.primary,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
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
    notificationContainer: {
      marginTop: 10,
      alignItems: "center",
    },
    notification: {
      fontSize: 16,
      color: "green",
      marginBottom: 10,
    },
  });

  export default container;
  