import {useRouter} from "expo-router";
import Background from '../../components/Background';
import Header from "../../components/Header";
import Button from '../../components/Button';

import { useUserStore } from "../../components/UserAuth";
import { theme } from '../../constants/theme';

export default function Logout() {
    const router = useRouter()
    const { removeAccessToken } = useUserStore();

    const handleLogout = async () => {
      try {
        await removeAccessToken();
        router.replace('/')
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

  return (
    <Background imageSource={require('../../assets/background_5.png')}>
    <Header>Hi!</Header>
      <Button style={{backgroundColor: theme.colors.primary }} mode="contained" onPress={handleLogout}>Logout</Button>
    </Background>
  );
}
