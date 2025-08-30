import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { updateUserProfile } from '../storage/userPrefs';

export default function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Register'>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    if (!name || !email) {
      Alert.alert('Campos obrigatórios', 'Preencha nome e e-mail.');
      return;
    }
    await updateUserProfile({ name, email });
    navigation.replace('CharacterSelect');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0f19', padding: 20, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 20 }}>Bem-vindo!</Text>

      <Text style={{ color: '#9ca3af' }}>Nome</Text>
      <TextInput
        placeholder="Seu nome"
        placeholderTextColor="#6b7280"
        value={name}
        onChangeText={setName}
        style={{ color: '#fff', borderWidth: 1, borderColor: '#1f2937', padding: 12, borderRadius: 12, marginBottom: 14 }}
      />

      <Text style={{ color: '#9ca3af' }}>E-mail</Text>
      <TextInput
        placeholder="seu@email.com"
        placeholderTextColor="#6b7280"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ color: '#fff', borderWidth: 1, borderColor: '#1f2937', padding: 12, borderRadius: 12, marginBottom: 20 }}
      />

      <Pressable onPress={onSubmit} style={({ pressed }) => ({
        backgroundColor: '#2563eb', padding: 14, borderRadius: 14, alignItems: 'center', opacity: pressed ? 0.85 : 1,
      })}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Continuar</Text>
      </Pressable>
    </View>
  );
}
