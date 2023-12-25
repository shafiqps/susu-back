import React, { useEffect, useState } from 'react';
import './RewardsList.css'; // Import your CSS file
import { ShoppingBag } from "@medusajs/icons"

const RewardsPage = () => {
    const [rewards, setRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState(null);

    useEffect(() => {
      const fetchRewards = async () => {
        const response = await fetch('http://localhost:9000/admin/rewards', {
          credentials:"include",

        });
        const data = await response.json();
        setRewards(data);
      };
  
      fetchRewards();
    }, []);

    const handleRewardClick = (reward) => {
        setSelectedReward(reward);
      };
    
  
    return (
      <div className="rewards-container">
        <h1 className="title">Rewards</h1>
        <button onClick={() => window.location.href = '/a/rewards/new' }className="create-reward-btn" >Create New Reward</button>

        <div className="rewards-grid">
          {rewards.map(reward => (
            <div key={reward.id} className="reward-card" onClick={() => handleRewardClick(reward)}>
              <img src={reward.image} alt={reward.caption} className="reward-image"/>
              <div className="reward-info">
                <h2>{reward.caption}</h2>
                <p>{reward.details}</p>
                <p className="price">Price: {reward.price/100}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedReward && (
        <RewardDetails reward={selectedReward} onClose={() => setSelectedReward(null)} />
      )}
      </div>
    );
  };
  
const RewardDetails = ({ reward, onClose }) => {
    const [editForm, setEditForm] = useState({
      created_at: reward.created_at,
      updated_at: reward.updated_at,
      price: reward.price,
      details: reward.details,
      caption: reward.caption,
    });
    const [newImage, setNewImage] = useState(reward.image);

    const handleDeleteReward = async () => {
        try {
          await fetch(`http://localhost:9000/admin/rewards/${reward.id}`, {
            method: 'DELETE',
            credentials:"include",
          });
          // Update UI to reflect the image deletion
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      };
    
      
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditForm({ ...editForm, [name]: value });
    };
  
    const handleSubmit = async () => {
        const updatedReward = {
            ...editForm,
            price: Math.round(editForm.price*100),
          };
        try {
          const response = await fetch(`http://localhost:9000/admin/rewards/${reward.id}`, {
            method: 'POST',
            credentials:"include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editForm),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update reward');
          }
      
          onClose(); // Refresh or fetch new data as needed
        } catch (error) {
          console.error('Error updating reward:', error);
        }
      };
      
  
    return (
        <div className="reward-details-modal">
        {/* Display reward details and provide inputs to edit them */}
        <img src={newImage || 'default-image-path'} alt={reward.caption} />
        <p>Caption</p>
        <input type="text" name="caption" value={editForm.caption} onChange={handleInputChange} />
        <p>Details</p>
        <textarea name="details" value={editForm.details} onChange={handleInputChange}></textarea>
        <p>Price</p>
        <input type="number" name="price" value={editForm.price} onChange={handleInputChange} />
        <div>
        <button onClick={handleSubmit}>Update Reward</button>
        <button onClick={onClose}>Close</button>
        <button onClick={handleDeleteReward}>Delete Reward</button>
        </div>
      </div>
    );
  };
  
export const config = {
    link: {
      label: "Rewards",
      icon: ShoppingBag,
    },
  };
export default RewardsPage;
