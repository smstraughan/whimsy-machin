//Imports -- browser router etc. from react to create MPA, pages as components, Sidebar component
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import WhimPage from "./pages/WhimPage";
import VoidPage from "./pages/VoidPage";
import SillyGooseSidebar from "./components/SillyGooseSidebar";

//Below I build my app with it's pages and also put the sidebar componenet in here because it lives on all pages
export default function App() {
  return (
    <BrowserRouter>
      <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <SillyGooseSidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/whim" element={<WhimPage />} />
            <Route path="/void" element={<VoidPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}