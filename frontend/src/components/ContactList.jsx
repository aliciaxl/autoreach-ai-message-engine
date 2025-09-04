import { useState } from 'react';

function ContactList({ contacts, onSelect, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  if (!contacts || contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium">No contacts available</p>
        <p className="text-sm">Add your first contact to get started</p>
      </div>
    );
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditForm(contact);
  };

  const handleSave = () => {
    onEdit(editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-8">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-[600] text-gray-900">
          Contacts ({contacts.length})
        </h2>
      </div>
      
      <div className="overflow-x-auto scrollbar-minimal">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                {editingId === contact.id ? (
                  // Edit mode
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-200 focus:border-transparent bg-white"
                        placeholder="Name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.role || ''}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-200 focus:border-transparent bg-white"
                        placeholder="Role"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-200 focus:border-transparent bg-white"
                        placeholder="Company"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-200 focus:border-transparent bg-white"
                        placeholder="Email"
                      />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View mode
                  <>
                    <td 
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => onSelect && onSelect(contact)}
                    >
                      <div>
                        <div className="text-sm font-[600] text-gray-900 transition-colors duration-200">
                          {contact.name || 'Unknown'}
                        </div>
                        {contact.context && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {contact.context}
                          </div>
                        )}
                      </div>
                    </td>
                    <td 
                      className="px-6 py-4 text-sm text-gray-600 cursor-pointer"
                      onClick={() => onSelect && onSelect(contact)}
                    >
                      {contact.role || '—'}
                    </td>
                    <td 
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => onSelect && onSelect(contact)}
                    >
                      <span className={`text-sm ${contact.company ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400'} transition-colors duration-200`}>
                        {contact.company || '—'}
                      </span>
                    </td>
                    <td 
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => onSelect && onSelect(contact)}
                    >
                      <span className={`text-sm ${contact.email ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400'} transition-colors duration-200`}>
                        {contact.email || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(contact);
                          }}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 border border-gray-300 rounded-md transition-colors duration-200"
                          title="Edit contact"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(contact.id);
                          }}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-300 rounded-md transition-colors duration-200"
                          title="Delete contact"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactList;