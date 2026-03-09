import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"; // if you're using it

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="text-center mt-5" style={{ flex: 1 }}>
        <h1>Welcome to Whimsy Machine</h1>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <span style={{ marginRight: "10px", fontSize: "1.1rem" }}>
            Go out on a whim 👉
          </span>

          <p>
            To Do:
            Make Footer Stay at bottom of page no matter what
            There was a problem where I went to duck page and then the animal page didnt refresh until i hit start again
            How do I want to start over in my whim page???

          </p>

          <Link to="/whim" style={{ textDecoration: "none" }}>
            <Button variant="primary">
              Whim
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>

      );
};

      export default HomePage