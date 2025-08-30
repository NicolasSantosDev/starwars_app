import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { searchPeople, Person } from '../api/swapi';
import PersonCard from '../components/PersonCard';
import { updateUserProfile } from '../storage/userPrefs';

export default function CharacterSelectScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CharacterSelect'>) {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      const initial = await searchPeople('skywalker');
      setData(initial);
    })();
  }, []);

  const onSelect = async (p: Person) => {
    await updateUserProfile({ favoriteCharacter: p.name });
    Alert.alert('Preferência salva', `${p.name} definido como favorito!`);
    navigation.replace('Search');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0f19', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 }}>Selecione seu personagem favorito</Text>
      <Text style={{ color: '#9ca3af', marginBottom: 12 }}>Toque para escolher</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PersonCard person={item} onPress={() => onSelect(item)} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
