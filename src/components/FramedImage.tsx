import React from "react";
import './FramedImage.css';

interface FramedImageProps {
  imageUrl: string;
  name?: string;
}

const FramedImage: React.FC<FramedImageProps> = ({ imageUrl, name }) => {
  return (
    <div className="frame">
      <img src={imageUrl} alt={name || "animal"} />
      {name && <div className="frame-name">{name}</div>}
    </div>
  );
};

export default FramedImage;