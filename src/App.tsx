//Import all necessary components
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import HomePage from "./pages/HomePage"
import WhimPage from "./pages/WhimPage";
import VoidPage from "./pages/VoidPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

//Where we connect our pages and set up what our website looks like. Using Browser router from react-router-dom to make it mpa
//Making the header and footer visible on every page
//Add the paths and components for each page
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/whim" element={<WhimPage />} />
        <Route path="/void" element={<VoidPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

