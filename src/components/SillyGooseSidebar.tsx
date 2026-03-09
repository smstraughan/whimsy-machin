import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import myImage from "../images/goose.webp"

//types for joke
type Joke = {
  setup: string;
  punchline: string;
};

//use states for sidebar -- whether it's showing and getting a new joke
const SillyGooseSidebar = () => {
  const [show, setShow] = useState(false);
  const [joke, setJoke] = useState<Joke | null>(null);

  //function for fetching a joke from external api
  const fetchJoke = async () => {
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    }
  };

  //useEffect for getting joke when the page loads
  useEffect(() => {
    fetchJoke();
  }, []); //empty dependency so that it runs when page first loads

  return (
    <>
      <Button
        variant="warning"
        className="position-fixed top-50 start-0 translate-middle-y"
        onClick={() => setShow(true)}
      >
        🦢
      </Button>
      {/**Use the OffCanvas bootstrap react component for my sidebar */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100 text-center">Silly Goose Mode</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={myImage}
            alt="Silly Goose"
            className="img-fluid mb-3"
          />
          {joke && (
            <>
              <p><strong>{joke.setup}</strong></p>
              <p>{joke.punchline}</p>
            </>
          )}

          <Button size="sm" onClick={fetchJoke}>
            Get Silly
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SillyGooseSidebar;