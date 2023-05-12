import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./index.css";

import defaultLogo from "./../../assets/default-profile.jpg";
import imageone from "./../../assets/start-icon.png";
import ImageSlider from "../../components/imageSlider";
import UserRating from "../../components/userRating";
import CustomButton from "../../components/custom-button"

function Ratings() {
  // const location = useLocation();
  // const { roomInfo, playerId, playerList, gameID } = location.state;
  const [likesLeft, setLikesLeft] = useState(4);
  const [likedGuesses, setLikedGuesses] = useState([]);
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
  const updateLikes = (isFav, guess) => {
    console.log(isFav, "isFav", likesLeft, "likesLeft", likedGuesses, "likedGuesses")
    if(isFav) {
      setLikesLeft(likesLeft - 1);
      likedGuesses.push({guess: guess, round: (currentIndex + 1)});
    }
    else {
      setLikesLeft(likesLeft + 1);
      likedGuesses.pop({guess: guess, round: (currentIndex + 1)});
    }
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
      <p>{likesLeft}</p>
        <CustomButton text="Finish"/>
      </div>
    </div>
  );
}

export default Ratings;