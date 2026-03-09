import { Button } from "react-bootstrap";
import type { Animal } from "../types/Animal";
import ImageFrame from "./ImageFrame";

// Types the props this component accepts
// Each "on" prop is a callback function passed down from WhimPage
interface AnimalCardProps {
  animal: Animal;
  selectedType: "dog" | "cat";
  catsSeenCount: number;
  proposedName: string;
  onNameChange: (name: string) => void; // fires when user types in the input
  onSubmit: () => void; // fires when user clicks Submit Name
  onDogRejection: () => void; // fires when user clicks the dog rejection button
  onCatRejection: () => void; // fires when user clicks the cat rejection button
}

const AnimalCard = ({
  animal,
  selectedType,
  catsSeenCount,
  proposedName,
  onNameChange,
  onSubmit,
  onDogRejection,
  onCatRejection,
}: AnimalCardProps) => (
  <div key={animal.id} className="mt-4">

    {/* Only show the Okay kitty heading if it's the first cat the user has seen */}
    {selectedType === "cat" && catsSeenCount === 1 && (
      <h2>Okay, then name a kitty!</h2>
    )}

    {/* ImageFrame is a  component that wraps the image in a fixed size container */}
    <ImageFrame src={animal.imageUrl} alt="animal" />

    {/* Display the animal's age and hobbies from the API data */}
    <p className="mt-3">
      Hi, I'm {animal.age} and my hobbies include {animal.hobbies}.
    </p>

    {/* Controlled input -- value is driven by proposedName state in WhimPage */}
    <input
      type="text"
      value={proposedName}
      onChange={(e) => onNameChange(e.target.value)}
      className="form-control w-50 mx-auto"
    />

    {/* Submit is disabled until the user has typed something */}
    <Button
      className="mt-3"
      onClick={onSubmit}
      disabled={!proposedName.trim()}
    >
      Submit Name
    </Button>

    {/* Dog rejection button -- only shown if the user is in the dog flow */}
    {selectedType === "dog" && (
      <div className="mt-3">
        <Button variant="secondary" onClick={onDogRejection}> 
          Nevermind, I am no longer a dog person
        </Button>
      </div>
    )}

    {/* Cat rejection button -- only shown if the user is in the cat flow */}
    {/* Button text changes depending on whether this is the first or subsequent cat */}
    {selectedType === "cat" && (
      <div className="mt-3">
        <Button variant="secondary" onClick={onCatRejection}>
          {catsSeenCount === 1
            ? "I'm not a cat person either"
            : "I've changed my mind, I'm done with cats."}
        </Button>
      </div>
    )}
  </div>
);

export default AnimalCard;