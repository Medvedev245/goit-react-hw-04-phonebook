import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, MainText, SecondMainText } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = contact => {
    if (
      contacts.find(el => el.name.toLowerCase() === contact.name.toLowerCase())
    ) {
      Notify.failure('Contact already exists');
    } else {
      Notify.success('Contact ADD');
      setContacts(prevState => [...prevState, { ...contact, id: nanoid(5) }]);
    }
  };

  const changeFilter = value => {
    setFilter(value);
  };

  const deleteNumber = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
  };

  const visibleItems = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <MainText>Phonebook</MainText>
      <ContactForm addContacts={addContacts} />
      <SecondMainText>Contacts</SecondMainText>
      <Filter contacts={contacts} onChangeName={changeFilter} />
      <ContactList contacts={visibleItems} onDelete={deleteNumber} />
    </Container>
  );
};
