import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import amazon from "../assets/amazon.png";
import overclocker from "../assets/overclockers.png";
import newegg from "../assets/newegg.png";
import argos from "../assets/argos.png";
import ebay from "../assets/ebay.png";
function ComparisonCard({ element, name }) {
  const [site, setSite] = useState();
  useEffect(() => {
    if (element.link.toLowerCase().includes("amazon")) {
      setSite(amazon);
    } else if (element.link.toLowerCase().includes("argos")) {
      setSite(argos);
    } else if (element.link.toLowerCase().includes("overclocker")) {
      setSite(overclocker);
    } else if (element.link.toLowerCase().includes("newegg")) {
      setSite(newegg);
    } else if (element.link.toLowerCase().includes("ebay")) {
      setSite(ebay);
    } else {
    }
  }, []);
  return (
    <div className="comparison">
      <div className="comparison__info">
        <p className="name">{name}</p>
        <p className="price">{element.price}</p>
        <Link to={element.link} target="_blank" className="link">
          {" "}
          Go to Site
        </Link>
      </div>
      <div className="comparison__image">
        <img src={site} alt="" />
      </div>
    </div>
  );
}

export default ComparisonCard;
