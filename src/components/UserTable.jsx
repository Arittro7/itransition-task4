import { Table, Form, Badge } from 'react-bootstrap';

function UserTable({ users, selectedUsers, setSelectedUsers }) {
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectOne = (e, id) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check 
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === users.length && users.length > 0}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Form.Check 
                  type="checkbox"
                  onChange={(e) => handleSelectOne(e, user.id)}
                  checked={selectedUsers.includes(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.last_login)}</td>
              <td>{formatDate(user.registration_time)}</td>
              <td>
                <Badge bg={user.status === 'active' ? 'success' : 'danger'}>
                  {user.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserTable;
