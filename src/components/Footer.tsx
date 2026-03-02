import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <Container>
        <p>This sucks I would rather scream into the void.</p>
        <Button variant="outline-light" onClick={() => navigate("/void")}>
          Void
        </Button>
      </Container>
    </footer>
  );
};

export default Footer;