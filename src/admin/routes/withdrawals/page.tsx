import React, { useEffect, useState } from 'react';
import { Table } from "@medusajs/ui" // Make sure to import Table from the correct library
import { Container } from "@medusajs/ui"


const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/withdrawals');
        if (!response.ok) {
          throw new Error('Failed to fetch withdrawals');
        }
        const data = await response.json();
        setWithdrawals(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWithdrawals();
  }, []);

  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const handleRowClick = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  const handleCloseDetails = () => {
    setSelectedWithdrawal(null);
  };

  const WithdrawalDetails = ({ withdrawal, onClose }) => {
    if (!withdrawal) return null;
  
    const handleUpdateStatus = async (newStatus) => {
      try {
        const response = await fetch(`http://localhost:9000/store/withdrawals/${withdrawal.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) {
          throw new Error('Failed to update withdrawal status');
        }
        onClose(); // Close the modal after updating
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <Container>
        <h2>Withdrawal Details</h2>
        <p>Total: {withdrawal.total}</p>
        <p>Status: {withdrawal.status}</p>
        {/* Include other details you want to show */}
        
        <button onClick={() => handleUpdateStatus('approved')}>Approve</button>
        <button onClick={() => handleUpdateStatus('rejected')}>Reject</button>
        <button onClick={onClose}>Close</button>
      </Container>
    );
  };
  

  return (
    <div>
      <Container>
      <h2>Withdrawals</h2>
      
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {withdrawals.map((withdrawal, index) => (
            <Table.Row key={withdrawal.id} onClick={() => handleRowClick(withdrawal)}>
              <Table.Cell>{withdrawal.total}</Table.Cell>
              <Table.Cell>{withdrawal.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
      {selectedWithdrawal && (
        <WithdrawalDetails 
          withdrawal={selectedWithdrawal} 
          onClose={handleCloseDetails} 
        />
      )}
      </div>
      </Container>
    </div>
  );
};

const WithdrawalDetails = ({ withdrawal, onClose, onUpdateStatus }) => {
  if (!withdrawal) return null;

  return (
    <Container>
        <h2>Withdrawal Details</h2>
        <p>Total: {withdrawal.total}</p>
        <p>Status: {withdrawal.status}</p>
        {/* Include other details you want to show */}
        
        <button onClick={() => onUpdateStatus(withdrawal.id)}>Update Status</button>
        <button onClick={onClose}>Close</button>
    </Container>
  );
};

export const config = {
  link: {
    label: "Withdrawals",
  },
};

export default Withdrawals;
