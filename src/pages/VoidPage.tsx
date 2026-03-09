import { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import Header from "../components/Header";

const VoidPage = () => {
  const [screams, setScreams] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  // Automatically clear screams when leaving page
  useEffect(() => {
    return () => {
      setScreams([]);
    };
  }, []);

  const handleSubmit = () => {
    if (currentMessage.trim() === "") return;

    setScreams([...screams, currentMessage]);
    setCurrentMessage("");
    setShowModal(false);
  };

  const handleRelease = () => {
    setScreams([]);
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}>
        <Header />
      <Container fluid className="text-center pt-5">

        <Button
          variant="light"
          size="lg"
          onClick={() => setShowModal(true)}
          className="mb-4"
        >
          Click here to scream into the void
        </Button>

        {/* Display Screams */}
        <div className="mt-4">
          {screams.map((scream, index) => (
            <p key={index} style={{ fontSize: "1.2rem" }}>
              {scream}
            </p>
          ))}
        </div>

        {screams.length > 0 && (
          <Button
            variant="danger"
            className="mt-4"
            onClick={handleRelease}
          >
            Send into the abyss
          </Button>
        )}

      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>At the top of your lungs....</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Scream here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Nevermind
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Scream!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VoidPage;