import { Button, ButtonGroup } from 'react-bootstrap';
import api from '../services/api';

function Toolbar({ selectedUsers, onSuccess, onSelfAction }) {
  const handleBlock = async () => {
    try {
      const response = await api.patch('/users/status', {
        userIds: selectedUsers,
        status: 'blocked',
      });
      onSuccess(response.data.message);
      if (response.data.selfBlocked) {
        onSelfAction();
      }
    } catch (error) {
      console.error('Failed to block users', error);
    }
  };

  const handleUnblock = async () => {
    try {
      const response = await api.patch('/users/status', {
        userIds: selectedUsers,
        status: 'active',
      });
      onSuccess(response.data.message);
    } catch (error) {
      console.error('Failed to unblock users', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected users?')) {
        try {
            const response = await api.delete('/users', { data: { userIds: selectedUsers } });
            onSuccess(response.data.message);
            if (response.data.selfDeleted) {
                onSelfAction();
            }
        } catch (error) {
            console.error('Failed to delete users', error);
        }
    }
  };

  return (
    <div className="mb-3">
      <ButtonGroup>
        <Button variant="danger" onClick={handleBlock} disabled={selectedUsers.length === 0}>
          Block
        </Button>
        <Button variant="success" onClick={handleUnblock} disabled={selectedUsers.length === 0}>
          <i className="bi bi-unlock-fill"></i>
        </Button>
        <Button variant="outline-danger" onClick={handleDelete} disabled={selectedUsers.length === 0}>
          <i className="bi bi-trash-fill"></i>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Toolbar;
