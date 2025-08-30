import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { searchPeople, Person } from '../api/swapi';
import PersonCard from '../components/PersonCard';
import { getUserProfile } from '../storage/userPrefs';

export default function SearchScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Search'>) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const profile = await getUserProfile();
      if (profile) setGreeting(`${profile.name}, seu favorito: ${profile.favoriteCharacter ?? '—'}`);
    })();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    try {
      const data = await searchPeople(query);
      setResults(data);
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao buscar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0f19', padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Buscar</Text>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Text style={{ color: '#93c5fd' }}>Perfil</Text>
        </Pressable>
      </View>

      {greeting && <Text style={{ color: '#9ca3af', marginTop: 6 }}>{greeting}</Text>}

      <View style={{ height: 14 }} />

      <TextInput
        placeholder="Digite o nome (ex.: Luke)"
        placeholderTextColor="#6b7280"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        style={{ color: '#fff', borderWidth: 1, borderColor: '#1f2937', padding: 12, borderRadius: 12 }}
      />

      <View style={{ height: 10 }} />

      <Pressable onPress={onSearch} style={({ pressed }) => ({
        backgroundColor: '#2563eb', padding: 12, borderRadius: 12, alignItems: 'center', opacity: pressed ? 0.85 : 1,
      })}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>{loading ? 'Buscando...' : 'Buscar'}</Text>
      </Pressable>

      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PersonCard
            person={item}
            onPress={() => Alert.alert(item.name, `Gênero: ${item.gender}\nAltura: ${item.height}\nPeso: ${item.mass}`)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 14 }}
      />
    </View>
  );
}
