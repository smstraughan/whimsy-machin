import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import myImage from "../images/goose.webp"

const SillyGooseSidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="warning"
        className="position-fixed top-50 start-0 translate-middle-y"
        onClick={() => setShow(true)}
      >
        🦢 
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100 text-center">Silly Goose Mode</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={myImage}
            alt="Silly Goose"
            className="img-fluid mb-3"
          />
          <p>Loading joke...</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SillyGooseSidebar;