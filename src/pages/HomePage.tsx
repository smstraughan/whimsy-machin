import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="text-center mt-5" style={{ flex: 1 }}>
        <h1>Welcome to Whimsy Machine</h1>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <span style={{ marginRight: "10px", fontSize: "1.1rem" }}>
            Go out on a whim 👉
          </span>
          {/**Button that takes you to whim page */}
          <Link to="/whim" style={{ textDecoration: "none" }}>
            <Button variant="primary">
              Whim
            </Button>
          </Link>
        </div>
      </div>
      <Footer /> {/**Use my footer component --  */}
    </div>

  );
};

export default HomePage