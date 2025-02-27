import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import InsertHouse from "./Pages/InsertHouse";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/results/:query" Component={Results} />
            <Route path="/inserthouse" Component={InsertHouse} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
