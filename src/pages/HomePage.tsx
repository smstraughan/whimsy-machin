import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <div className="text-center mt-5" style={{ flex: 1 }}>
      <h1>Welcome to Whimsy Machine</h1>
      <p>TO DO: Add a button that takes you to the whimsy page</p>
      <p>Add some color and animation if it strikes the fancy</p>
      <p>Silly Goose Side Bar needs the joke functionality</p>
      <p>Whimsy page needs the most work!</p>
    </div>
     <Footer /> 
</div>

  );
};

export default HomePage