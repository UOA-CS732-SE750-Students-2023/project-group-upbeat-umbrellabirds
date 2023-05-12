import { useEffect, useState } from "react";
import "./index.css";

import defaultLogo from "./../../assets/default-profile.jpg";
import imageone from "./../../assets/start-icon.png";
import ImageSlider from "../../components/imageSlider";
import UserRating from "../../components/userRating";
import CustomButton from "../../components/custom-button"

function RatingsPage() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([
    {
      id: 1,
      guess: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog",
      isFavorite: false,
    },
    {
      id: 2,
      guess: "The quick brown fox jumps over the lazy dog",
      isFavorite: true,
    },
    {
      id: 3,
      guess: "https://example.com/jane-smith.jpg",
      isFavorite: true,
    }
  ]);

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };

  const handleFavoriteToggle = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          isFavorite: !user.isFavorite,
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

  const images = [defaultLogo, imageone, defaultLogo];
  return (
    <div className="ratings-page-container">
      <div className="container-header">
        <h1>Rate the guesses</h1>
      </div>
      <div className="image-container">
        <div className="rounds">
          <h3>ROUND {currentIndex + 1}/5</h3>
        </div>
        <div className="slider">
          <ImageSlider images={images} onImageChange={handleImageChange} />
        </div>
        <div className="current-index">
          <p className="index-text">Currently showing image {currentIndex + 1}</p>
        </div>
      </div>
      <div className="rating-container">
        {users.map((user) => (
          <UserRating
            key={user.id}
            guess={user.guess}
            isFavorite={user.isFavorite}
            onFavoriteToggle={() => handleFavoriteToggle(user.id)}
          />
        ))}
      </div>
      <div className="container-footer">
        <CustomButton text="Finish"/>
      </div>
    </div>
  );
}

export default RatingsPage;
