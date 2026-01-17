import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import PersonalLife from "./pages/PersonalLife";
import Contact from "./pages/Contact";
import CV from "./pages/CV";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="life" element={<PersonalLife />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cv" element={<CV />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
