import React, { useEffect, useState } from 'react';
import { Table } from "@medusajs/ui" // Make sure to import Table from the correct library
import { Container } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import { Text } from "@medusajs/ui"

import { Cash } from "@medusajs/icons"



const Redeems = () => {
  const [redeem, setRedeems] = useState([]);

  useEffect(() => {
    const fetchRedeems = async () => {
      try {
        const response = await fetch('http://localhost:9000/admin/redeems', {
            credentials:"include",
        });
        if (!response.ok) {
          throw new Error('Failed to fetch redeems');
        }
        const data = await response.json();
        setRedeems(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRedeems();
  }, []);





  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };
  const handleUpdateStatus = async (newStatus,redeems) => {
    try {
      const response = await fetch(`http://localhost:9000/store/redeems/${redeems.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update withdrawal status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    const handleAccept = async (redeems) => {
      try {
        // Update withdrawal status to 'approved'
        await handleUpdateStatus('approved', redeems);
        console.log(redeems.customer_id)
        // Deduct points from the customer's LoyaltyPoints
        const response = await fetch('http://localhost:9000/store/update-loyalty-points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: redeems.customer_id,
            pointsToDeduct: redeems.rewards.price
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update customer loyalty points');
        }
    
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div>
      <Container>
      <Text size="xlarge" weight="plus" family="sans">
        Redemptions
        </Text>
      
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Reward</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>

              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {redeem.map((redeem) => (
              <Table.Row key={redeem.id}>
                <Table.Cell>{formatDate(redeem.created_at)}</Table.Cell>
                <Table.Cell>{redeem.rewards?.caption}</Table.Cell>
                <Table.Cell>{redeem.rewards?.price}</Table.Cell>
                <Table.Cell>{redeem.status}</Table.Cell>
                <Table.Cell>{redeem.customer?.email || 'Unknown'}</Table.Cell>
                <Table.Cell>
                {redeem.status !== 'approved' && redeem.status !== 'rejected' && (
                    <>
                        <Button onClick={() => handleAccept(redeem)}>Approve</Button>
                        <Button onClick={() => handleUpdateStatus('rejected', redeem)}>Reject</Button>
                    </>
                    )}
                </Table.Cell>
                {/* Add more fields as needed */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );

}


export const config = {
  link: {
    label: "Reward Redemption",
  },
};

export default Redeems;
