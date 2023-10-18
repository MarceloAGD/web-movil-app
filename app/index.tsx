
import {useRouter} from "expo-router"
import { theme } from '../constants/theme';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from "../components/Header";


export default function StartScreen() {
  const router = useRouter()
 return (
  <Background imageSource={require('../assets/background_2.png')}>
    <Header>Bienvenido</Header>
    <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => router.push('/login')}> Login</Button>
    <Button textColor={theme.colors.primary} mode="outlined" onPress={() => router.push('/signUp')}> Sign In</Button>
  </Background>
 )
}

