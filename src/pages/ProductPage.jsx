import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComparisonCard from "../components/ComparisonCard";

function ProductPage() {
  const { productId, selectedIndex } = useParams();
  const [product, setProduct] = useState({});
  const [comparisons, setComparisons] = useState([]);

  const getKeyboardDetail = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/getKeyboardDetailById?keyboardId=${productId}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      if(selectedIndex != null){
      setProduct(data["data"][selectedIndex]);
      await getComparisonByKeybardId(data["data"][selectedIndex].id);
      return;
      }else{
      setProduct(data["data"][0]);
      await getComparisonByKeybardId(data["data"][0].id);
      }

    } catch (ex) {
      console.log(ex);
      // return;
    }
  };

  const getComparisonByKeybardId = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/getComparisonsByDetailId?keyboardId=${id}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      setComparisons(data["data"]);
    } catch (ex) {
      console.log(ex);
      // return;
    }
  };
  useEffect(() => {
    getKeyboardDetail();
  }, []);
  useEffect(() => {
    console.log(productId);
    console.log(selectedIndex);
  });
  return (
    <div className="container">
      <div className="details">
        <div className="details__image">
          <img src={product.description_image} alt="" />
        </div>
        <div className="details__text text">
          <h3>{product.short_description}</h3>
          <p className="text__brand">
            Brand <strong>{product.brand}</strong>
          </p>
          <p className="text__model">
            Model <strong>{product.model}</strong>
          </p>
          <p className="text__color">
            Color <strong>{product.color}</strong>
          </p>
        </div>
      </div>

      <div className="comparisons">
        <h2>Compare Prices</h2>
        {comparisons.map((element, index) => {
          return (
            <ComparisonCard element={element} key={index} name={product.name} />
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
