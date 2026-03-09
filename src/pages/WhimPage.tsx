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

type Mode =
  | "start"
  | "naming"
  | "confirming"
  | "finalized"
  | "duckPhase"
  | "complete";



const WhimPage = () => {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [creaturas, setCreaturas] = useState<Creatura[]>([]);
  const [mode, setMode] = useState<Mode>("start");
  const [usedAnimalIds, setUsedAnimalIds] = useState<string[]>([]);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [currentCreatura, setCurrentCreatura] = useState<Creatura | null>(null);
  const [proposedName, setProposedName] = useState("");
  const [selectedType, setSelectedType] =
    useState<"dog" | "cat" | null>(null);
  const [catsSeenCount, setCatsSeenCount] = useState(0); //Use state for how many cats the user has seen -- we need to know if they have seen at least one for the flow


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

  const handleUpdateCreatura = async () => {
    if (!currentCreatura) return;

    try {
      const updated = await updateCreatura({
        ...currentCreatura,
        name: proposedName,
      });

      setCurrentCreatura(updated);

      setCreaturas(prev =>
        prev.map(c => (c.id === updated.id ? updated : c))
      );

      setMode("confirming");
      setProposedName("");
    } catch (error) {
      console.error("Error updating creatura:", error);
    }
  };

  const resetToStart = () => {
    setUsedAnimalIds([]);
    setCurrentAnimal(null);
    setCurrentCreatura(null);
    setSelectedType(null);
    setMode("start");
    setCatsSeenCount(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Container className="text-center mt-5">

          {/* START SCREEN */}
          {mode === "start" && (
            <>
              <h1>Where shall we begin?</h1>

              <Button
                className="m-2"
                onClick={() => startAnimalFlow("dog")}
              >
                Name a Puppy!
              </Button>

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
          {mode === "naming" && currentAnimal && selectedType && (
            <div key={currentAnimal.id} className="mt-4">

              {selectedType === "cat" && catsSeenCount === 1 && (
                <h2>Okay, then name a kitty!</h2>
              )}

              <ImageFrame src={currentAnimal.imageUrl} alt="animal" />

              <p className="mt-3">
                Hi, I'm {currentAnimal.age} and my hobbies include{" "}
                {currentAnimal.hobbies}.
              </p>

              <input
                type="text"
                value={proposedName}
                onChange={(e) => setProposedName(e.target.value)}
                className="form-control w-50 mx-auto"
              />

              <Button
                className="mt-3"
                onClick={
                  currentCreatura
                    ? handleUpdateCreatura
                    : handleCreateCreatura
                }
                disabled={!proposedName.trim()}
              >
                Submit Name
              </Button>

              {/*DOG REJECTION BUTTON*/}
              {selectedType === "dog" && (
                <div className="mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCurrentAnimal(null);
                      setCurrentCreatura(null);
                      setProposedName("");
                      startAnimalFlow("cat");
                    }}
                  >
                    Nevermind, I am no longer a dog person
                  </Button>
                </div>
              )}


              {/* CAT REJECTION BUTTON */}
              {selectedType === "cat" && (
                <div className="mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCurrentAnimal(null);
                      setSelectedType(null);
                      setMode("duckPhase");
                    }}
                  >
                    {catsSeenCount === 1 ? "I'm not a cat person either" : "I've changed my mind, I'm done with cats."}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* CONFIRMING */}
          {mode === "confirming" && currentCreatura && (
            <div className="mt-4">
              <ImageFrame src={currentCreatura.imageUrl} alt={currentCreatura.name} />
              <h4> Hi, my name is {currentCreatura.name}.</h4>

              <Button onClick={() => {
                if (currentCreatura) {
                  setCreaturas(prev => [...prev, currentCreatura]);
                }
                setMode("finalized");
              }}>
                {selectedType === "cat" ? "Meow!" : "Good Boy"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  setProposedName(currentCreatura.name);
                  setMode("naming");
                }}
              >
                That's Not Quite Right
              </Button>
            </div>
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
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        style={{ width: "100%", borderRadius: "12px" }}
                      />
                      <h5>{c.name}</h5>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={async () => {
                          await deleteCreatura(c.id!);
                          setCreaturas(prev =>
                            prev.filter(x => x.id !== c.id)
                          );
                        }}
                      >
                        Send Back to the Pound
                      </Button>
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