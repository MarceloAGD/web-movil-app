import { StyleSheet, Button, TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

import Background from '../../components/Background';
import Header from "../../components/Header";

export default function TabOneScreen() {

  return (
    <Background imageSource={require('../../assets/background_dot.png')}>
    <Header> Bienvenido al Home!</Header>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  
});
