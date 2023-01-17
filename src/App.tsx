import { HashRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <Layout>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </Layout>
  );
}

export default App;
