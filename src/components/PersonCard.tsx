import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Person } from '../api/swapi';

export default function PersonCard({ person, onPress }: { person: Person; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({
      padding: 16,
      backgroundColor: '#111827',
      borderRadius: 16,
      marginVertical: 8,
      opacity: pressed ? 0.85 : 1,
    })}>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{person.name}</Text>
      <View style={{ height: 6 }} />
      <Text style={{ color: '#d1d5db' }}>Gênero: {person.gender}</Text>
      <Text style={{ color: '#d1d5db' }}>Altura: {person.height} • Peso: {person.mass}</Text>
      <Text style={{ color: '#9ca3af' }}>Nascimento: {person.birth_year}</Text>
    </Pressable>
  );
}
