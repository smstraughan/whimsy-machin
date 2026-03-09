// components/ImageFrame.tsx
const ImageFrame = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ width: "425px", height: "500px", margin: "0 auto" }}>
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }}
    />
  </div>
);

export default ImageFrame;