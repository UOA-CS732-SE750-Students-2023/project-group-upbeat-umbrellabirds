import { useState } from 'react';

function ImageSlider({ images, onImageChange }) {
  const [index, setIndex] = useState(0);

  const handleNextClick = () => {
    const nextIndex = (index + 1) % images.length;
    setIndex(nextIndex);
    onImageChange(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (index + images.length - 1) % images.length;
    setIndex(prevIndex);
    onImageChange(prevIndex);
  };

  const styles = {
    image: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "5px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      width: "512px",
      height: "512px",
      position: "relative"
    },
    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "30px",
      height: "30px",
      backgroundColor: "black",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out",
      color:"white"
    },
    arrowLeft: {
      left: "10px"
    },
    arrowRight: {
      right: "10px"
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <img
        className='image'
        src={images[index]}
        alt={`Image ${index + 1}`}
        style={styles.image}
      />
      <div
        className='arrow'
        style={{ ...styles.arrow, ...styles.arrowLeft }}
        onClick={handlePrevClick}
      >
        &lt;
      </div>
      <div
        className='arrow'
        style={{ ...styles.arrow, ...styles.arrowRight }}
        onClick={handleNextClick}
      >
        &gt;
      </div>
    </div>
  );
}

export default ImageSlider;
