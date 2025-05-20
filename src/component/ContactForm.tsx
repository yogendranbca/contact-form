"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Contact } from "../types/Contact";

interface Props {
  onAdd: (contact: Contact) => void;
  onUpdate: (contact: Contact) => void;
  editData: Contact | null;
  clearEdit: () => void;
}

const ContactForm: React.FC<Props> = ({
  onAdd,
  onUpdate,
  editData,
  clearEdit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setMobile(editData.mobile);
    }
  }, [editData]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !validateEmail(email) || !validateMobile(mobile)) {
      alert("Please enter valid Name, Email, and 10-digit Mobile Number.");
      return;
    }

    const contact: Contact = {
      id: editData?.id || Date.now().toString(),
      name,
      email,
      mobile,
    };

    editData ? onUpdate(contact) : onAdd(contact);
    setName("");
    setEmail("");
    setMobile("");
    clearEdit();
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mobile Number
        </label>
        <input
          id="mobile"
          type="text"
          placeholder="Enter your mobile number"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        {editData ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
