import PhonebookForm from "components/PhonebookForm/PhonebookForm";
import ContactList from "components/ContactList/ContactList";
import Filter from "components/Filter/Filter";
import { Container } from "./App.styled";
import { useState } from "react";
import { useEffect } from "react";

const contactsList = [
{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  let defaultContactsList = [];
  const contactListLocal = JSON.parse(localStorage.getItem('contacts'));

  if(contactListLocal !== null && contactListLocal.length > 0){     
      defaultContactsList = contactListLocal;
  } else {defaultContactsList = contactsList};
  
  const [contacts , setContacts] = useState(defaultContactsList);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  },[contacts]);

  const addContact = (newContact) => {
    const contactsNames = contacts.map(contact => contact.name);

    if (contactsNames.includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`)
    } else {
      setContacts([newContact,...contacts])
    }    
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleFilter = e => {
   setFilter(e.currentTarget.value );
  }

  const getFilteredContacts = () => {                                               
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter}  />
      <ContactList value={filteredContacts} onDeleteContact={deleteContact} />
    </Container>
    );
}