import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';
import Toolbar from '../components/Toolbar';
import UserTable from '../components/UserTable';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logout } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuccess = (message) => {
    setSuccess(message);
    fetchUsers();
    setSelectedUsers([]); 
    setTimeout(() => setSuccess(''), 3000); 
  };
  
  const handleSelfAction = () => {
    logout();
  };

  return (
    <>
      <AppNavbar />
      <Container className="mt-4">
        <h2 className="mb-4">User Management</h2>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Toolbar 
          selectedUsers={selectedUsers}
          onSuccess={handleSuccess}
          onSelfAction={handleSelfAction}
        />
        
        <UserTable 
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Container>
    </>
  );
}

export default UserManagementPage;
