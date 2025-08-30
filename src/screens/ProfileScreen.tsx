import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getUserProfile } from '../storage/userPrefs';

export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [favorite, setFavorite] = useState<string | undefined>('');

  useEffect(() => {
    (async () => {
      const p = await getUserProfile();
      if (p) {
        setName(p.name);
        setEmail(p.email);
        setFavorite(p.favoriteCharacter);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0f19', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Perfil</Text>
      <View style={{ height: 10 }} />
      <Text style={{ color: '#9ca3af' }}>Nome</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>{name}</Text>

      <Text style={{ color: '#9ca3af' }}>E-mail</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>{email}</Text>

      <Text style={{ color: '#9ca3af' }}>Personagem favorito</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>{favorite ?? '—'}</Text>

      <Pressable onPress={() => navigation.replace('CharacterSelect')} style={({ pressed }) => ({
        backgroundColor: '#2563eb', padding: 12, borderRadius: 12, alignItems: 'center', opacity: pressed ? 0.85 : 1,
      })}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Trocar personagem</Text>
      </Pressable>
    </View>
  );
}
