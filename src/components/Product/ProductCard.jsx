import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function ProductCard({ element, color, selectedVariation, variationId }) {
  const navigate = useNavigate();

  const checkIfProductHasVaraiations = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/checkDuplicateKeyboardId?keyboardId=${element.id}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      return data["hasDuplicates"];
    } catch (ex) {
      console.log(ex);
      return;
    }
  };
  const handleClick = async () => {
    if (selectedVariation == null) {
      const duplicate = await checkIfProductHasVaraiations();
      if (duplicate) {
        //Instance when the call returns true
        navigate(`/variation/${element.id}`);
      } else {
        navigate(`/product/${element.id}`);
      }
    } else {
      navigate(`/product/${variationId}/${selectedVariation}`);
    }
  };
  return (
    <div className="product" onClick={() => handleClick()}>
      <div className="product__image">
        <img src={element.image} alt="" />
      </div>
      <p className="product__name">{element.name}</p>
      <p className="product__variation">{color}</p>
      <div className="product__link" onClick={() => handleClick()}>
        <p>View More</p>
        <IoIosArrowForward />
      </div>
    </div>
  );
}

export default ProductCard;
