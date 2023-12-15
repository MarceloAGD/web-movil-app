import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "expo-router";
import { ENDPOINT_MS_AUTH, ENDPOINT_MS_USER } from '@env';
import Header from "../../components/Header";
import Button from "../../components/Button";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import container from "../../constants/container";
import { theme } from "../../constants/theme";
import { useUserStore } from "../../components/UseUserStore";
import { Text } from "../../components/Themed";
import { styles } from '../../constants/style';
import { SelectList } from 'react-native-dropdown-select-list'

const EditProfile: React.FC = () => {
  const router = useRouter();
  const { accessToken, setAccessToken, email } = useUserStore();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rol, setRol] = useState("");
  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const user = await axios.post(`${ENDPOINT_MS_AUTH}/get-user`, { email });
        setName(user.data?.name);
        setLastname(user.data?.lastname);
        setRol(user.data?.rol);
      } catch (error) {
        console.error("Error obteniendo la información del usuario:", error);
      }
    };

    getUserInformation();

  }, []);
  
  const handleUpdateProfile = async () => {
    try {
      console.log("ENDPOINT_MS_USER}/update-user en edit-profile.tsx",ENDPOINT_MS_USER)  
      await axios.post(
        `${ENDPOINT_MS_USER}/update-user`,
        {
          name: name,
          lastname: lastname,
          email: email,
          role: rol,
        }
      );
      useUserStore.setState({
        email: email,
        userName: name,
      })

      
      setError('Profile update!!');

      setTimeout(() => {
        router.replace('/(home)/user');
      }, 3000);
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      console.log("ENDPOINT_MS_USER}/update-password en edit-profile.tsx",ENDPOINT_MS_USER)
      const isUpdated = await axios.post(
        `${ENDPOINT_MS_USER}/update-password`,
        {
          email,
          oldPassword,
          newPassword,
        }
      );
      console.log("isUpdated?:",isUpdated);
      if(isUpdated.data){
        setError('password updated');
      }if(!isUpdated.data){
        setError('error updating password');
      }
      
      setTimeout(() => {
        router.replace('/(home)/user');
      }, 3000);
    } catch (error) {
      setError('Error saving changes');
      console.error("Error saving changes:", error);
    }
  };

  const setChangePasswordAndsetError = async () => {
    setChangePassword(!changePassword);
    setError('');
  };

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={{marginTop: 50, alignSelf: 'center'}}>
 
        <Header>Edit Profile</Header>
        {changePassword ? (
          <View>
            
            <Text style={container.title}>Old Password</Text>
            <TextInput
              style={container.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
            <Text style={container.title}>New Password</Text>
            <TextInput
              style={container.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Button
              style={{ backgroundColor: theme.colors.primary }}
              mode="contained"
              onPress={handleChangePassword}
            >
              Save Password
            </Button>
            
          </View>
          
        ) : (
          <View>
            <Text style={container.title}>Name</Text>
            <TextInput
              style={container.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={container.title}>Lastname</Text>
            <TextInput
              style={container.input}
              placeholder="Lastname"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
            <Text style={container.title}>Select role</Text>
            <SelectList
            setSelected={(value: string) => setRol(value)}
            save="value"
            defaultOption={{ key:'1', value:'user' }}
            data={[{key: '1', value: 'user' },{key: '2', value: 'admin' },{key: '3', value: 'developer' },{key: '1', value: 'manager' }]}
            />
            <Button
              style={{ marginTop: 20, backgroundColor: theme.colors.primary, width: 200}}
              mode="contained"
              onPress={handleUpdateProfile}
            >
              Save
            </Button>
          </View>
        )}
        <Button
        style={{ marginTop: 20, width: 200}}
          textColor={theme.colors.primary}
          mode="outlined"
          onPress={setChangePasswordAndsetError}
        >
          {changePassword ? "Cancel" : "Change Password"}
        </Button>
        <Text style={{color: theme.colors.primary}}>{error}</Text>
        </View>
      </KeyboardAvoidingView>
  );
}

export default EditProfile;