import { useState } from 'react';

const AddContactForm = ({ onAddContact, onCancel }) => {
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    context: ''
  });

  const handleInputChange = (field, value) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!newContact.name.trim()) {
      alert('Please enter a name for the contact');
      return;
    }

    const contactToAdd = {
      ...newContact,
      id: Date.now()
    };

    onAddContact(contactToAdd);
    
    // Reset form
    setNewContact({
      name: '',
      email: '',
      company: '',
      role: '',
      context: ''
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-[48%] min-w-[400px] mx-2 my-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <input
          type="text"
          placeholder="Name *"
          value={newContact.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all duration-200"
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all duration-200"
        />
        <input
          type="text"
          placeholder="Company"
          value={newContact.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all duration-200"
        />
        <input
          type="text"
          placeholder="Role"
          value={newContact.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all duration-200"
        />
        <textarea
          placeholder="Context (how you know them, their interests, etc.)"
          value={newContact.context}
          onChange={(e) => handleInputChange('context', e.target.value)}
          className="md:col-span-2 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 h-24 resize-none transition-all duration-200"
        />
        <div className="md:col-span-2 flex gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            Add Contact
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactForm;