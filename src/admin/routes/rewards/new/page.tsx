import React, { useState } from 'react';
import './NewRewardForm.css'; // Import your CSS file for styling

const NewRewardForm = () => {
  const [formData, setFormData] = useState({
    price: '',
    details: '',
    caption: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('files', formData.image);
    try {
      const response = await fetch('http://localhost:9000/admin/uploads', {
        method: 'POST',
      
        body: data,
        credentials:"include",
      });
      const fileData = await response.json();
      return fileData; // Adjust depending on your API response
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await handleImageUpload();
    const url = imageUrl.uploads[0].url
    console.log(imageUrl.uploads[0])
    console.log(url)
    const rewardData = {
      price: Math.round(Number(formData.price)*100),
      details: formData.details,
      caption: formData.caption,
      image: url,
    };

    console.log(rewardData)

    try {
      const response = await fetch('http://localhost:9000/admin/rewards', {
        method: 'POST',
        credentials:"include",

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rewardData),
      });

      if (!response.ok) {
        throw new Error('Failed to create reward');
      }

      const result = await response.json();
      console.log('Reward created:', result);
    } catch (error) {
      console.error('Error creating reward:', error);
    }
    setLoading(false);

  };

  return (
    <div className="new-reward-container">
      <h2>Create New Reward</h2>
      <form onSubmit={handleSubmit} className="new-reward-form">
        <label htmlFor="caption">Caption</label>
        <input type="text" name="caption" value={formData.caption} onChange={handleInputChange} placeholder="Enter a catchy caption" />

        <label htmlFor="details">Details</label>
        <textarea name="details" value={formData.details} onChange={handleInputChange} placeholder="Describe the reward"></textarea>

        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Set a price for the reward" />

        <label htmlFor="image">Reward Image</label>
        <input type="file" name="image" onChange={handleInputChange} />
        {imagePreview && <img src={imagePreview} alt="Reward preview" className="image-preview"/>}

        <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Creating...' : 'Create Reward'}</button>
      </form>
    </div>
  );
};

export default NewRewardForm;
