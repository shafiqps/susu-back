import React, { useEffect, useState } from 'react';
import { Table } from "@medusajs/ui" // Make sure to import Table from the correct library
import { Container } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import { Text } from "@medusajs/ui"

import { Cash } from "@medusajs/icons"



const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/admin/withdrawals',{
          credentials:"include"
        });
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };
  
  const WithdrawalDetails = ({ withdrawal, onClose }) => {
    if (!withdrawal) return null;
    const handleAccept = async () => {
      try {
        // Update withdrawal status to 'approved'
        await handleUpdateStatus('approved');
    
        // Deduct points from the customer's LoyaltyPoints
        const response = await fetch('http://localhost:9000/store/update-loyalty-points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: withdrawal.customer_id,
            pointsToDeduct: withdrawal.total,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update customer loyalty points');
        }
    
        onClose(); // Close the modal after updating
      } catch (error) {
        console.error('Error:', error);
      }
    };
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
        <Text>Withdrawal Details</Text>
        <p>Total: {withdrawal.total}</p>
        <p>Status: {withdrawal.status}</p>
        <p>Reason: {withdrawal.reason}</p>
        {/* Include other details you want to show */}
        {withdrawal.status !== 'approved' && withdrawal.status !== 'rejected' && (
          <>
            <Button onClick={handleAccept}>Approve</Button>
            <Button onClick={() => handleUpdateStatus('rejected')}>Reject</Button>
          </>
        )}
        
        <Button onClick={onClose}>Close</Button>
      </Container>
    );
  };
  

  return (
    <div>
      <Container>
      <Text size="xlarge" weight="plus" family="sans">
        Withdrawals
        </Text>
      
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Total RM</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {withdrawals.map((withdrawal) => (
              <Table.Row key={withdrawal.id} onClick={() => handleRowClick(withdrawal)}>
                <Table.Cell>{formatDate(withdrawal.created_at)}</Table.Cell>
                <Table.Cell>{withdrawal.total/100}</Table.Cell>
                <Table.Cell>{withdrawal.status}</Table.Cell>
                <Table.Cell>{withdrawal.customer?.email || 'Unknown'}</Table.Cell>
                {/* Add more fields as needed */}
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
        <Text size="base" weight="regular" family="sans">Withdrawal Details</Text>
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
    icon: Cash,
  },
};

export default Withdrawals;
