import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import HouseDetails from "./Pages/HouseDetails";
import InsertHouse from "./Pages/InsertHouse";
import InsertModule from "./Components/InsertModule";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/results/:query" Component={Results} />
            <Route path="/inserthouse" Component={InsertHouse} />
            <Route path="/insertnew" Component={InsertModule} />
            <Route path="/houses/:id" Component={HouseDetails} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;