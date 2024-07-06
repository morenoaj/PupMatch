import React, { useState } from 'react';

const Prueba = () => {
  const [data, setData] = useState({ name: '', age: '' });
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.text();
        console.log('Response from server:', result);
      } else {
        console.error('Error submitting data', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/data/${userId}`);
      if (response.ok) {
        const result = await response.json();
        setUserData(result);
      } else {
        console.error('Error fetching user data', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  return (
    <div>
      <h1>Send Data to Firebase</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={data.name} onChange={handleChange} />
        </div>
        <div>
          <label>Age: </label>
          <input type="number" name="age" value={data.age} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Get Data for Specific User</h2>
      <div>
        <label>User ID: </label>
        <input type="text" value={userId} onChange={handleIdChange} />
        <button onClick={fetchUserData}>Get User Data</button>
      </div>

      {userData && (
        <div>
          <h3>User Data</h3>
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
        </div>
      )}
    </div>
  );
};

export default Prueba;
