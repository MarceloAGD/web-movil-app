import { StyleSheet, Button , TextInput} from 'react-native';
import { useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';


import axios from 'axios';

export default function TabOneScreen() {
  const [email, setEmail] = useState('diego@gmail.com');
  const [password, setPassword] = useState('1234');
  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.0.25:4001/user/sign-in', {
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Email</Text>
      <TextInput
        placeholder="email@email.cl"
        value={email}
        inputMode="email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <Text>Password`</Text>
      <TextInput
        placeholder="Password"
        value={password}
        inputMode="text"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button title="SignIn" onPress={() => signIn(email, password)} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
