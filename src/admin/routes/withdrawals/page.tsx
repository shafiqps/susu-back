import { RouteConfig } from "@medusajs/admin"
import React, { useEffect, useState } from 'react';


const Withdrawals = () => {
    const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/admin/withdrawals'); // Adjust this URL to your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch withdrawals');
        }
        const data = await response.json();
        setWithdrawals(data.posts); // Adjust 'posts' based on your API response structure
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
  

  export const config: RouteConfig = {
    link: {
      label: "Withdrawals",
    },
  };

export default Withdrawals
