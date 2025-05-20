"use client";
import React from "react";
import { Contact } from "../types/Contact";

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactTable: React.FC<Props> = ({ contacts, onEdit, onDelete }) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      onDelete(id);
    }
  };

  if (contacts.length === 0) return null;

  return (
    <table className="w-full mt-6 border border-gray-300 shadow-sm rounded-md overflow-hidden">
      <thead>
        <tr className="bg-blue-50 text-left text-sm font-semibold text-gray-700">
          <th className="p-3 border-b border-gray-300">Name</th>
          <th className="p-3 border-b border-gray-300">Email</th>
          <th className="p-3 border-b border-gray-300">Mobile</th>
          <th className="p-3 border-b border-gray-300 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-600">
        {contacts.map((contact) => (
          <tr
            key={contact.id}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <td className="p-3 border-b border-gray-200">{contact.name}</td>
            <td className="p-3 border-b border-gray-200">{contact.email}</td>
            <td className="p-3 border-b border-gray-200">{contact.mobile}</td>
            <td className="p-3 border-b border-gray-200 text-center space-x-2">
              <button
                onClick={() => onEdit(contact)}
                className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
