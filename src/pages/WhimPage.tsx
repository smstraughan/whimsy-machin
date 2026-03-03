import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Animal } from "../types/Animal";
import type { Creatura } from "../types/Creatura";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllAnimals } from "../services/animalService";
import {
  getAllCreaturas,
  createCreatura,
  updateCreatura,
  deleteCreatura
} from "../services/creaturaService";

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

    const animalsOfType = animals.filter(a => a.type === type);

    const available = animalsOfType.filter(
      a => !usedAnimalIds.includes(a.id)
    );

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
      setCreaturas(prev => [...prev, created]);
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
  };

  return (
    <>
      <Header />
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
        {mode === "naming" && currentAnimal && (
          <div className="mt-4">
            <h2>
              {selectedType === "cat"
                ? "Okay, then name a kitty!"
                : ""}
            </h2>

            <div className="d-flex justify-content-center">
              <img
                src={currentAnimal.imageUrl}
                alt="animal"
                style={{ width: "300px", borderRadius: "12px" }}
              />
            </div>

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
              Submit
            </Button>

            {/* CAT REJECTION BUTTON */}
            {selectedType === "cat" && (
              <div className="mt-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCurrentAnimal(null);
                    setMode("duckPhase");
                  }}
                >
                  I'm not a cat person either
                </Button>
              </div>
            )}
          </div>
        )}

        {/* CONFIRMING */}
        {mode === "confirming" && currentCreatura && (
          <div className="mt-4">
            <div className="d-flex justify-content-center">
              <img
                src={currentCreatura.imageUrl}
                alt="animal"
                style={{ width: "300px", borderRadius: "12px" }}
              />
            </div>
            <h4>{currentCreatura.name}</h4>

            <Button onClick={() => setMode("finalized")}>
              Good Boy
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
            <div className="d-flex justify-content-center">
              <img
                src={currentCreatura.imageUrl}
                alt="animal"
                style={{ width: "300px", borderRadius: "12px" }}
              />
            </div>
            <h4>{currentCreatura.name}</h4>

            <Button
              onClick={() => {
                setCurrentCreatura(null);
                setCurrentAnimal(null);
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
            <h2>Here is your duck.</h2>
            <div className="d-flex justify-content-center">
              <img
                src="/duck.jpg"
                alt="Henri the Duck"
                style={{ width: "300px", borderRadius: "12px" }}
              />
            </div>
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

        <hr className="my-5" />

        {/* GALLERY */}
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

      </Container>
      <Footer />
    </>
  );
};

export default WhimPage;