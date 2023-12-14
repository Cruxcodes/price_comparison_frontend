import NavBar from "./components/Navigation/NavBar";
import logo from "./logo.svg";
// import './App.css';
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import ProductVariation from "./pages/ProductVariation";
import Products from "./pages/Products";
import "./styles/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<Products />} path="/search/:searchValue" />
          <Route element={<ProductVariation />} path="/variation/:productId" />
          <Route
            element={<ProductPage />}
            path="/product/:productId/:selectedIndex?"
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
