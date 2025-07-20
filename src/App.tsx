import "./App.css";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <Layout title="Generate your API">
        <p className="text-gray-300 mb-4">
          Welcome! Use the form below to define your entity and generate a full
          CRUD boilerplate.
        </p>
      </Layout>
    </>
  );
}

export default App;
