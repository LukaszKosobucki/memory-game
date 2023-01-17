import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Game from "./pages/Game";
import Leaderboards from "./pages/Leaderboards";
import Start from "./pages/Start";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
