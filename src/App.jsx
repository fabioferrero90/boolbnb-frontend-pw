import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Contexts/GlobalContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Pages/Home";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
      <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
