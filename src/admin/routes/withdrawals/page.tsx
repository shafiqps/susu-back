import React, { useEffect, useState } from 'react';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        // Adjust this URL to your actual API endpoint
        const response = await fetch('http://localhost:9000/store/withdrawals');
        if (!response.ok) {
          throw new Error('Failed to fetch withdrawals');
        }
        const data = await response.json();
        // Set state based on your API response structure
        setWithdrawals(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWithdrawals();
  }, []);
  
  return (
    <div>
      <h1>Withdrawals</h1>
      <ul>
        {withdrawals.map((withdrawal) => (
          <li key={withdrawal.id}> {/* Use a unique identifier */}
            Total: {withdrawal.total}, Status: {withdrawal.status}
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const config = {
  link: {
    label: "Withdrawals",
  },
};

export default Withdrawals;
