import apiProvider from './apiProvider';

export interface Person {
  id: number;
  name: string;
  age: number;
}

export const getPersons = async (): Promise<Person[]> => {
  return apiProvider.get('/persons');
};

export const createPerson = async (data: { name: string; age: number }) => {
  return apiProvider.post<Person>('/persons', data);
};

export const updatePerson = async (id: number, data: Partial<Person>) => {
  return apiProvider.put<Person>(`/persons/${id}`, data);
};

export const deletePerson = async (id: number) => {
  return apiProvider.delete(`/persons/${id}`);
};
