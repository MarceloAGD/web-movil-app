import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import { theme } from "../../constants/theme";
import { useRouter } from "expo-router";

const Teams: React.FC = () => {
    const router = useRouter();
    return(
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Button mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            onPress={() => router.push('/team/teamsOwner')}>
                My Teams 
            </Button>
            <Button mode="contained"
            style={{ marginBottom: 10, backgroundColor: theme.colors.primary }}
            onPress={() => router.push('/team/teamsMember')}>
                Teams
            </Button>

        </View>
    )
}

export default Teams;