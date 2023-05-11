import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./index.css";

import PlayerProfile from "../../components/player-profile";
import defaultLogo from "./../../assets/default-profile.jpg";
import imageone from "./../../assets/start-icon.png";
import ImageSlider from "../../components/imageSlider";
import UserRating from "../../components/userRating";


function RatingsPage() {
  const location = useLocation();
  const { roomInfo, playerId, playerList, gameID } = location.state;
  const [likesLeft, setLikesLeft] = useState(4);
  const [likedGuesses, setLikedGuesses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      imageUrl: "https://example.com/john-doe.jpg",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      imageUrl: "https://example.com/jane-smith.jpg",
      isFavorite: true,
    },
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
    <div className="container">
      <div className="container-header">
        <h3>Rate the guesses</h3>
      </div>
      <div className="image-container">
        <div className="rounds">
          <p>ROUND 5/5</p>
        </div>
        <div className="slider">
          <ImageSlider images={images} onImageChange={handleImageChange} />
        </div>
        <div className="current-index">
          <p>Currently showing image {currentIndex + 1}</p>
        </div>
      </div>
      <div className="rating-container">
        {users.map((user) => (
          <UserRating
            key={user.id}
            name={user.name}
            isFavorite={user.isFavorite}
            updateLikes={updateLikes}
            onFavoriteToggle={() => {handleFavoriteToggle(user.id)}}
            likesLeft={likesLeft}
          />
        ))}
      </div>
      <div className="container-footer">
        <p>Finish {likesLeft}</p>
      </div>
    </div>
  );
}

export default RatingsPage;
