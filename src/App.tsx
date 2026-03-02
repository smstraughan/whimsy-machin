import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import WhimPage from "./pages/WhimPage";
import VoidPage from "./pages/VoidPage";
import SillyGooseSidebar from "./components/SillyGooseSidebar";

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