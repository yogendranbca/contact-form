"use client";
import React, { useEffect, useState } from "react";
import ContactForm from "../component/ContactForm";
import ContactTable from "../component/ContactTable";
import { Contact } from "../types/Contact";

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editData, setEditData] = useState<Contact | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const updateContact = (updated: Contact) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const clearEdit = () => setEditData(null);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Form</h1>
      <ContactForm
        onAdd={addContact}
        onUpdate={updateContact}
        editData={editData}
        clearEdit={clearEdit}
      />
      <ContactTable
        contacts={contacts}
        onEdit={setEditData}
        onDelete={deleteContact}
      />
    </div>
  );
};

export default Home;
