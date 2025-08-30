import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = {
  name: string;
  email: string;
  favoriteCharacter?: string;
};

const KEY = 'SW_USER_PROFILE_V1';

export async function getUserProfile(): Promise<UserProfile | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUserProfile(profile: UserProfile) {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

export async function updateUserProfile(patch: Partial<UserProfile>) {
  const current = (await getUserProfile()) || { name: '', email: '' };
  const next = { ...current, ...patch } as UserProfile;
  await saveUserProfile(next);
  return next;
}

export async function clearProfile() {
  await AsyncStorage.removeItem(KEY);
}
