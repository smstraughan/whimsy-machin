import { Button } from "react-bootstrap";
import type { Creatura } from "../types/Creatura";
import ImageFrame from "./ImageFrame";

// Types of props this component accepts
// selectedType can be null if the user has not chosen a type yet
interface ConfirmingCardProps {
  creatura: Creatura; // the creatura that was just created via the API
  selectedType: "dog" | "cat" | null;
  onConfirm: () => void; // fires when user clicks Good Boy / Meow
  onRename: () => void; // fires when user clicks That's Not Quite Right
}

const ConfirmingCard = ({
  creatura,
  selectedType,
  onConfirm,
  onRename,
}: ConfirmingCardProps) => (
  <div className="mt-4">

    {/* ImageFrame keeps the image in a fixed size container to prevent layout jumps */}
    <ImageFrame src={creatura.imageUrl} alt={creatura.name} />

    {/* Display the name that was just submitted */}
    <h4>Hi, my name is {creatura.name}.</h4>

    {/* Confirm button -- label changes based on whether the user is in the cat or dog flow */}
    {/* Clicking this adds the creatura to the farm and moves to finalized mode */}
    <Button className="m-2" onClick={onConfirm}>
      {selectedType === "cat" ? "Meow!" : "Good Boy"}
    </Button>

    {/* Rename button -- takes the user back to naming mode with the current name pre-filled */}
    <Button variant="secondary" className="m-2" onClick={onRename}>
      That's Not Quite Right
    </Button>
  </div>
);

export default ConfirmingCard;