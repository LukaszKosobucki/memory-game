import { Variants } from "framer-motion";

interface Ivariants {
  [key: string]: Variants;
}
export const variantsLeaderboard: Ivariants = {
  endGame: {
    initial: { x: "100vh" },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: "100vh", opacity: 0, transition: { duration: 0.5 } },
  },
  preGame: {
    initial: { x: "100vh" },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: "100vh", opacity: 0, transition: { duration: 0.5 } },
  },
};

export const variantsGame: Ivariants = {
  endGame: {
    initial: { x: "-100vh" },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: "-100vh", opacity: 0, transition: { duration: 0.5 } },
  },

  preGame: {
    initial: { x: "-100vh" },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: "-100vh", opacity: 0, transition: { duration: 0.5 } },
  },
};
