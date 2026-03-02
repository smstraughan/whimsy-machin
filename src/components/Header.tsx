import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🌪 Whimsy Machine
        </Navbar.Brand>
        <Button variant="outline-dark" onClick={() => navigate("/adventure")}>
          Start Again
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;