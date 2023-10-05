
import {useRouter} from "expo-router"
import { theme } from '../constants/theme';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from "../components/Header";


export default function StartScreen() {
  const router = useRouter()
 return (
  <Background>
    <Header>Bienvenido</Header>
    <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={() => router.replace('/login')}> Login</Button>
    <Button textColor={theme.colors.primary} mode="outlined" onPress={() => router.replace('/signIn')}> Sign Up</Button>
  </Background>
 )
}

