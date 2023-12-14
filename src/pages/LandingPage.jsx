import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import ProductCard from "../components/Product/ProductCard";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const fetchRandomProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/random", {
        method: "GET",
        mode: "cors",
      });
      const data = await res.json();
      setProducts(data["data"]);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    fetchRandomProduct();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchItem}`);
  };
  return (
    <div>
      <div className="landing hero header">
        <h1>Find the best keyboard deals</h1>
        <div className="landing__search">
          <GoSearch />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="What keyboard are you looking for? "
            />
          </form>
        </div>
      </div>
      <div className="popular container">
        <h3>Some of our Products</h3>
        <div className="productCards">
          {products
            .filter(
              (element) =>
                element.id !== null &&
                element.name !== null &&
                element.name !== null
            )
            .map((element, index) => (
              <ProductCard key={index} element={element} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
