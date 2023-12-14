import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";

function ProductVariation() {
  const { productId } = useParams();
  const [variations, setVariations] = useState([]);
  const [name, setName] = useState("");

  const getSearchResults = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/getKeyboards?keyboardId=${productId}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      setName(data["data"][0].name);
      setVariations(data["data"]);
    } catch (ex) {
      console.log(ex);
      // return;
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);
  return (
    <div className="container">
      <h3 className="title">Variations of {name}</h3>
      <div className="variations productCards">
        {variations
          .filter(
            (element) =>
              element.id !== null &&
              element.name !== null &&
              element.name !== null
          )
          .map((element, index) => (
            <ProductCard
              key={index}
              element={element}
              variationId={productId}
              color={element.color}
              selectedVariation={index}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductVariation;
