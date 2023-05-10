import { useState } from 'react';
import liked from "./../assets/liked.png";
import unliked from "./../assets/unliked.png";

function UserRating({ name,  onFavoriteClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick();
  };

  const favoriteIcon = isFavorite
    ? liked
    : unliked;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
    
      <p style={{ margin: "0 10px" }}>{name}</p>
      <img src={favoriteIcon} alt="favorite" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={handleFavoriteClick} />
    </div>
  );
}

export default UserRating;
