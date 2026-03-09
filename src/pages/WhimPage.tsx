import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Animal } from "../types/Animal";
import type { Creatura } from "../types/Creatura";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllAnimals } from "../services/animalService";
import duckImg from "../images/duck.jpg"
import {
  getAllCreaturas,
  createCreatura,
  updateCreatura,
  deleteCreatura
} from "../services/creaturaService";
import ImageFrame from "../components/ImageFrame";
import GalleryCard from "../components/GalleryCard";
import AnimalCard from "../components/AnimalCard";
import ConfirmingCard from "../components/ConfirmingCard";

//Mode-based state approach for a multi-step flow

type Mode =
  | "start"
  | "naming"
  | "confirming"
  | "finalized"
  | "duckPhase"
  | "complete";



const WhimPage = () => {
  //Set Use States
  const navigate = useNavigate();
  const [animals, setAnimals] = useState<Animal[]>([]); //Animals load into -- imports types from animal.ts
  const [creaturas, setCreaturas] = useState<Creatura[]>([]); //Creaturas load into -- impots type from creatura.ts
  const [mode, setMode] = useState<Mode>("start"); //Keeps track of mode for flow and sets initial value to start
  const [usedAnimalIds, setUsedAnimalIds] = useState<string[]>([]); //keeps track of used animal ids so we dont reuse in random picker
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);//keeps track of current animal
  const [currentCreatura, setCurrentCreatura] = useState<Creatura | null>(null); //keeps track of current creatura
  const [proposedName, setProposedName] = useState(""); //keeps track of proposed name
  const [selectedType, setSelectedType] = //keeps track of type to use with mode and for flow
    useState<"dog" | "cat" | null>(null);
  const [catsSeenCount, setCatsSeenCount] = useState(0); //Use state for how many cats the user has seen -- we need to know if they have seen at least one for the flow


  //fetches all animals and creaturas from apis on inital load and sets data
  useEffect(() => {
    const loadData = async () => {
      try {
        const animalData = await getAllAnimals();
        const creaturaData = await getAllCreaturas();
        setAnimals(animalData);
        setCreaturas(creaturaData);
      } catch (error) {
        console.error("Failed to load page data:", error);
      }
    };
    loadData();
  }, []);


//animal flow function 
//takes which type of animal it is, filters the animals to that type, if its a cat increments cats seen
//for all animals determines if there are any left to see, if not sets mode to complete,
//if yes then selects a random animal of the provided type
//keeps track of "used" animal ids
//sets mode to naming
  const startAnimalFlow = (type: "dog" | "cat") => {
    setSelectedType(type);
    setCurrentCreatura(null);
    setProposedName("");

    const animalsOfType = animals.filter(a => a.type === type);

    const available = animalsOfType.filter(
      a => !usedAnimalIds.includes(a.id)
    );

    if (type === "cat") {
      setCatsSeenCount(prev => prev + 1); //increments cats so that we know if we have seen at least one cat (import for later rendering)
    }

    if (available.length === 0) {
      setMode("complete");
      return;
    }

    const random =
      available[Math.floor(Math.random() * available.length)];

    setUsedAnimalIds(prev => [...prev, random.id]);
    setCurrentAnimal(random);
    setMode("naming");
  };


  //function for creating creatura, uses the already created post function
  //this happens when the button for set name is pressed
  //it creates a creatura, sets the current creatura, the proposed name, and changes mode to confirming
  const handleCreateCreatura = async () => {
    if (!currentAnimal) return;

    try {
      const created = await createCreatura({
        animalId: currentAnimal.id,
        type: currentAnimal.type,
        imageUrl: currentAnimal.imageUrl,
        age: currentAnimal.age,
        hobbies: currentAnimal.hobbies,
        name: proposedName,
      });

      setCurrentCreatura(created);
      setProposedName("");
      setMode("confirming");
    } catch (error) {
      console.error("Error creating creatura:", error);
    }
  };

  //This is the function used in the confirming mode -- uses PUT function to update a creatura
  //
  const handleUpdateCreatura = async () => {
    if (!currentCreatura) return; //makes sure there is a current creatura

    try {
      const updated = await updateCreatura({ //calls the update API
        ...currentCreatura, //spreads existing creatura data to keep all exisiting fields and just overriding the name with the new proposed name
        name: proposedName,
      });

      setCurrentCreatura(updated); //updates the state with the API info and the new name

      setCreaturas(prev => //updates the creatura array in state so that the newly updated version changes but all else stays
        prev.map(c => (c.id === updated.id ? updated : c))
      );

      setMode("confirming"); //move to confirming mode so that user can approve the new name
      setProposedName(""); //clear input field
    } catch (error) {
      console.error("Error updating creatura:", error);
    }
  };


  //Clearing function to reset all local state if the user starts again
  const resetToStart = () => {
    setUsedAnimalIds([]);
    setCurrentAnimal(null);
    setCurrentCreatura(null);
    setSelectedType(null);
    setMode("start");
    setCatsSeenCount(0);
  };
  
  //RENDERING!!!
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Container className="text-center mt-5">

          {/* START SCREEN */} 
          {/**This is cool. Rendering is conditionally based on mode, first is start mode */}
          {mode === "start" && (
            <>
              <h1>Where shall we begin?</h1>

              {/**if user chooses to name a puppy, startanimal flow tye dog */}
              <Button
                className="m-2"
                onClick={() => startAnimalFlow("dog")} 
              >
                Name a Puppy!
              </Button>

              {/**If user chooses not a dog person then animal flow starts with type cat */}
              <Button
                className="m-2"
                variant="secondary"
                onClick={() => startAnimalFlow("cat")} 
              >
                I'm not a dog person
              </Button>
            </>
          )}

          {/* NAMING SCREEN */}
          {/**If mode is set to naming, there is a current animal and a selected type - will render Animal Card Component */}
          {mode === "naming" && currentAnimal && selectedType && (
            <AnimalCard
              animal={currentAnimal}
              selectedType={selectedType}
              catsSeenCount={catsSeenCount}
              proposedName={proposedName}
              onNameChange={setProposedName}
              onSubmit={currentCreatura ? handleUpdateCreatura : handleCreateCreatura}
              onDogRejection={() => {
                setCurrentAnimal(null);
                setCurrentCreatura(null);
                setProposedName("");
                startAnimalFlow("cat");
              }}
              onCatRejection={() => {
                setCurrentAnimal(null);
                setSelectedType(null);
                setMode("duckPhase");
              }}
            />
          )}

          {/* CONFIRMING */}
          {/**If  in confirming mode and there is a currentCreatura then render the ConfirmingCard Component */}
          {mode === "confirming" && currentCreatura && (
            <ConfirmingCard
              creatura={currentCreatura}
              selectedType={selectedType}
              onConfirm={() => {
                setCreaturas(prev => [...prev, currentCreatura]);
                setMode("finalized");
              }}
              onRename={() => {
                setProposedName(currentCreatura.name);
                setMode("naming");
              }}
            />
          )}
          {/* FINALIZED */}
          {mode === "finalized" && currentCreatura && (
            <div className="mt-4">
              <ImageFrame src={currentCreatura.imageUrl} alt={currentCreatura.name} />
              <h4>{currentCreatura.name}</h4>

              <Button
                onClick={() => {
                  if (selectedType) {
                    startAnimalFlow(selectedType);
                  }
                }}
              >
                Name Another
              </Button>
            </div>
          )}

          {/* DUCK PHASE */}
          {mode === "duckPhase" && (
            <div className="mt-4">
              <h2>Then here is your duck.</h2>
              <ImageFrame src={duckImg} alt="Henri the Duck" />
              <p>His name is Henri.</p>
              <p>Now go scream into the void.</p>

              <Button variant="dark" onClick={() => navigate("/void")}>
                Void
              </Button>
            </div>
          )}

          {/* COMPLETE */}
          {mode === "complete" && (
            <div className="mt-4">
              <h3>You’ve seen all available animals!</h3>
              <Button onClick={resetToStart}>
                Start Over
              </Button>
            </div>
          )}

          {/**Gallery Reendering */}

          <div style={{ minHeight: "200px" }}>
            {creaturas.length > 0 && (
              <>
                <hr className="my-5" />

                <h3>Frank's Funky Farm</h3>

                <Row>
                  {creaturas.map(c => (
                    <Col md={4} key={c.id} className="mb-4">
                      <GalleryCard
                        creatura={c}
                        onDelete={async (id) => {
                          await deleteCreatura(id);
                          setCreaturas(prev => prev.filter(x => x.id !== id));
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>

        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default WhimPage;