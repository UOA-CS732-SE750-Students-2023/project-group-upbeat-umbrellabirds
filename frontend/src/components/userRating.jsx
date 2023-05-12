import { useState } from 'react';
import liked from "./../assets/liked.png";
import unliked from "./../assets/unliked.png";

function UserRating({ name, guess, onFavoriteClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick();
  };

  const favoriteIcon = isFavorite
    ? liked
    : unliked;

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px"}}>
      <p style={{ margin: "0 10px", maxWidth: "600px", fontSize: "20px" }}>{guess}</p>
      <img src={favoriteIcon} alt="favorite" style={{ width: "20px", height: "20px", cursor: "pointer", marginLeft: "30px" }} onClick={handleFavoriteClick} />
    </div>
  );
}

export default UserRating;
