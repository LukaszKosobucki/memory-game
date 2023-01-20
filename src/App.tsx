import { HashRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AnimatedRoutes from "./AnimatedRoutes";
import { GlobalStateProvider } from "./utils/ContextWrapper";

function App() {
  return (
    <Layout>
      <GlobalStateProvider>
        <HashRouter>
          <AnimatedRoutes />
        </HashRouter>
      </GlobalStateProvider>
    </Layout>
  );
}

export default App;
