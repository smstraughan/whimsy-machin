import { Button } from "react-bootstrap";
import type { Creatura } from "../types/Creatura";

interface GalleryCardProps {
  creatura: Creatura;
  onDelete: (id: string) => void;
}

const GalleryCard = ({ creatura, onDelete }: GalleryCardProps) => (
  <div>
    <div style={{ width: "100%", height: "200px", overflow: "hidden", borderRadius: "12px" }}>
      <img
        src={creatura.imageUrl}
        alt={creatura.name}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
    <h5>{creatura.name}</h5>
    <Button
      variant="danger"
      size="sm"
      onClick={() => onDelete(creatura.id!)}
    >
      Send Back to the Pound
    </Button>
  </div>
);

export default GalleryCard;