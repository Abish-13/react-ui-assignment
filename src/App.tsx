import { useState, useEffect } from 'react';
import { DataTable } from './components/InputField/DataTable/DataTable';
import type { Column } from './components/InputField/DataTable/DataTable';

// Define the shape of our data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Create some sample data to display
const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
  { id: 4, name: 'Diana Miller', email: 'diana@example.com', role: 'Editor' },
];

// Define the columns for the table
const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Simulate fetching data when the component loads
  useEffect(() => {
    setTimeout(() => {
      setUsers(sampleData);
      setLoading(false);
    }, 2000); // 2-second delay
  }, []);

  const showEmptyState = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Users Data</h1>
        <button onClick={showEmptyState} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Test Empty State
        </button>
      </div>
      <DataTable 
        data={users} 
        columns={columns}
        selectable={true}
        loading={loading}
      />
    </div>
  );
}

export default App;