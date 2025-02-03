import { useState, useEffect } from 'react';
import { getPersons, createPerson, deletePerson, Person } from '@/api/personService';

export const usePersons = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      console.error('Failed to fetch persons', error);
    } finally {
      setLoading(false);
    }
  };

  const addPerson = async (name: string, age: number) => {
    try {
      const newPerson = await createPerson({ name, age });
      setPersons((prev) => [...prev, newPerson]);
    } catch (error) {
      console.error('Error adding person', error);
    }
  };

  const removePerson = async (id: number) => {
    try {
      await deletePerson(id);
      setPersons((prev) => prev.filter((person) => person.id !== id));
    } catch (error) {
      console.error('Error deleting person', error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return { persons, loading, addPerson, removePerson };
};
