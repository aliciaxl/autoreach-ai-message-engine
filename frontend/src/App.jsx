import { useState, useEffect } from 'react';
import ContactList from './components/ContactList.jsx';
import ContactDetail from './components/ContactDetail.jsx';
import AddContactForm from './components/AddContactForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    fetch('/contacts')
      .then(res => res.json())
      .then(contactsData => {
        setContacts(contactsData);
        setFilteredContacts(contactsData);
      })
      .catch(err => {
        // Fallback with sample data for demo
        const sampleContacts = [
          {
            id: 1,
            name: 'John Doe',
            role: 'Software Engineer',
            email: 'john@example.com',
            company: 'Tech Corp',
            context: 'Met at tech conference, interested in AI solutions',
            last_contact: '2024-01-15'
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'Product Manager',
            email: 'jane@example.com',
            company: 'Innovation Inc',
            context: 'LinkedIn connection, looking for partnership opportunities',
            last_contact: '2024-01-10'
          }
        ];
        setContacts(sampleContacts);
        setFilteredContacts(sampleContacts);
      });
  }, []);

  // Dynamic search filter
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.context?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    
    // Close form and show contacts
    setShowAddForm(false);
    setShowContacts(true);
  };

  const handleCancelAddContact = () => {
    setShowAddForm(false);
  };

  const handleEditContact = (updatedContact) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    
    if (selected && selected.id === updatedContact.id) {
      setSelected(updatedContact);
    }
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    
    if (selected && selected.id === contactId) {
      setSelected(null);
    }
  };

  const toggleContactsView = () => {
    setShowContacts(!showContacts);
    if (showContacts) {
      setSelected(null);
    }
  };

  // Show contact list if explicitly toggled OR if searching
  const shouldShowContacts = showContacts || searchTerm.trim().length > 0;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="mx-auto px-6 py-8 flex justify-center flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-2">
              <span className="inline-block scale-110 origin-bottom">A</span>UTO
              <span className="inline-block scale-110 origin-bottom">R</span>EACH
            </h1>
            <p className="text-medium text-gray-600">Messaging Powered by AI. Personalized by you.</p>
          </div>

          {/* Control Bar - All in one row */}
          <div className="flex space-x-12 items-center bg-white rounded-xl border border-gray-200 w-[60%] p-2">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative w-[320px]">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 py-1 pr-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className='flex items-center'>
            {/* Add Contact */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-1 mr-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-all duration-200 whitespace-nowra"
            >
              {showAddForm ? 'Cancel' : '+ Add Contact'}
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* Show Contacts Toggle */}
            <button
              onClick={toggleContactsView}
              className={`px-4 py-1 ml-2 text-sm border border-orange-100 rounded-lg transition-all duration-200 whitespace-nowrap ${
                showContacts 
                  ? 'text-gray-600 hover:text-gray-700 hover:bg-gray-50' 
                  : 'text-orange-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              {showContacts ? 'Hide All' : `Show All (${contacts.length})`}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex flex-col justify-center items-center px-6 pb-8">

        {/* Add Contact Form */}
        {showAddForm && (
          <AddContactForm 
            onAddContact={handleAddContact}
            onCancel={handleCancelAddContact}
          />
        )}
        
        {/* Contact List - Show when toggled OR when searching */}
        {shouldShowContacts && (
          <div className="space-y-6">
            <ContactList 
              contacts={filteredContacts} 
              onSelect={setSelected}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
            
            {/* Contact Detail */}
            {selected && (
              <div className="bg-white rounded-lg border border-gray-200">
                <ContactDetail contact={selected} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!shouldShowContacts && !showAddForm && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your Contact Hub</h3>
              <p className="text-gray-500 text-sm">
                Search to find contacts instantly, or use the controls above to manage your network.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;