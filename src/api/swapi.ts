export type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
};

const BASE = 'https://swapi.dev/api';

export async function searchPeople(query: string): Promise<Person[]> {
  if (!query) return [];
  const res = await fetch(`${BASE}/people/?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Falha ao buscar personagens');
  const data = await res.json();
  return data.results as Person[];
}
