import React, { useState } from 'react';
import type {FormEvent} from 'react';

interface User {
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: '',
    age: 0,
    hobbies: [],
    friends: []
  });

  // Helper: handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };

  // For hobbies & friends, user enters comma-separated values
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim()).filter(Boolean)
    }));
  };

  // Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}`, {
      // const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create user');

      const result = await response.json();
      console.log('✅ User created:', result);
      alert('User created successfully!');
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error creating user');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
        margin: '2rem auto'
      }}
    >
      <h2>Create User</h2>

      <label>
        Username:
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          required
          min={0}
          value={formData.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Hobbies (comma separated):
        <input
          type="text"
          name="hobbies"
          required
          value={formData.hobbies.join(', ')}
          onChange={handleArrayChange}
        />
      </label>

      <label>
        Friends (comma separated):
        <input
          type="text"
          name="friends"
          value={formData.friends.join(', ')}
          onChange={handleArrayChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
