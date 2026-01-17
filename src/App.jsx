import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const PersonalLife = lazy(() => import("./pages/PersonalLife"));
const Contact = lazy(() => import("./pages/Contact"));
const CV = lazy(() => import("./pages/CV"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-text-muted dark:text-zinc-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="life" element={<PersonalLife />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cv" element={<CV />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
