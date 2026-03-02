import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WhimPage() {
  return (
     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
    <div className="text-center mt-5" style={{ flex: 1 }}>
      <h2>Adventure Begins Here</h2>
      <p>Where should we begin? Name a puppy! button that generates an image of a puppy with the the ability to name it</p>
      <p>need all functionality for this page -- fetch random photo for the puppy, name it, view it in a frame with a name, ability to update the name, ability to delete the puppy form the creatura list</p>
      <p>alternate button that says im not a dog person and takes you to the image of a cat</p>
      <p>button that says im not a cat person either and gives you the duck</p>
    </div>
    <Footer />
    </div>
  );
};

