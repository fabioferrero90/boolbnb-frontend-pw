import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home";
import Results from "./Pages/Results";
import HouseDetails from "./Pages/HouseDetails";
import InsertHouse from "./Pages/InsertHouse";
import InsertModule from "./Components/InsertModule";
import Reviews from "./Components/Reviews";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/results/:query" element={<Results />} />
            <Route path="/inserthouse" element={<InsertHouse />} />
            <Route path="/insertnew" element={<InsertModule />} />
            <Route path="/houses/:id" element={<HouseDetails />} />
            <Route path="/reviews/:id" element={<Reviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
