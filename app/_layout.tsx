import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(home)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signIn/login" options={{ headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}} />
        <Stack.Screen name="signIn/register" options={{ headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}} />
        <Stack.Screen name="signIn/recovery"  options={{headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="signIn/reset"  options={{headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="project/addTeam" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="project/editProject" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="team/teamsOwner" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="team/teamsMember" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="team/editTeam" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="team/addMember" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="profile/edit-profile" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="project/backlog" options={{presentation: 'fullScreenModal',headerShown: true , headerTitle: '', headerTransparent: true, headerTintColor: 'black'}}/>
      </Stack>
    </ThemeProvider>
  );
}
