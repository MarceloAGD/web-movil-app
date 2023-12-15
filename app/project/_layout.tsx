import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, router } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";

import Colors from '../../constants/Colors';



export default function TabLayout2() {
    const router = useRouter();
  const colorScheme = useColorScheme();
  const storedId = useLocalSearchParams<{id: string; storedId?: string }>();
  
  return (
    <Tabs >
        <Tabs.Screen
        name="editProject"
        options={{
            title: 'Edit Project',
            tabBarIcon: ({ color }) => <FontAwesome name="edit" size={28} style={{ marginBottom: -3 }} color={color} />,
            headerShown: false,
        }}
        />
        <Tabs.Screen
        name="backlog"
        
        options={{
            title: 'Backlog',
            tabBarIcon: ({ color }) => <FontAwesome name="tasks" size={28} style={{ marginBottom: -3 }} color={color} />,
            headerShown: false,
        }}
        />
        <Tabs.Screen
            name="addTeam"
            options={{
                title: 'Add Team',
                tabBarIcon: ({ color }) => <FontAwesome name="plus" size={28} style={{ marginBottom: -3 }} color={color} />,
                headerShown: false,
            }}
        />
    </Tabs>
      
  );
}
