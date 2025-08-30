import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';
import CharacterSelectScreen from './src/screens/CharacterSelectScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { getUserProfile } from './src/storage/userPrefs';

export type RootStackParamList = {
  Register: undefined;
  CharacterSelect: undefined;
  Search: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    (async () => {
      const profile = await getUserProfile();
      if (!profile?.name || !profile?.email) {
        setInitialRoute('Register');
      } else if (!profile?.favoriteCharacter) {
        setInitialRoute('CharacterSelect');
      } else {
        setInitialRoute('Search');
      }
    })();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} options={{ title: 'Seu Personagem' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar Personagens' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
