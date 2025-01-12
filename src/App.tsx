import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HotBar } from "./components/HotBar";
import Index from "./pages/Index";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Posts from "./pages/Posts";
import "./App.css";

function App() {
  return (
    <Router>
      <HotBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;