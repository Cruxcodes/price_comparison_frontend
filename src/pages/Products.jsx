import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Products() {
  const { searchValue } = useParams();
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const getSearchResults = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/search?search=${searchValue}&page=${currentPage}&pageSize=6`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      setPageSize(data["totalPages"]);
      setCurrentProducts(data["data"]);
    } catch (ex) {
      console.log(ex);
      // return;
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  useEffect(() => {
    getSearchResults();
  }, [currentPage]);

  return (
    <div className="container">
      <h3 className="title">Products</h3>
      {currentProducts.length > 1 ? (
        <div>
          <div className="productCards">
            {currentProducts.map((element, index) => {
              return <ProductCard key={index} element={element} />;
            })}
          </div>
          <div className="pagination">
            <button
              className={currentPage <= 1 ? "disabled" : "pagination__prev"}
              disabled={currentPage <= 1}
              onClick={() =>
                setCurrentPage((current) => {
                  return current - 1;
                })
              }
            >
              <FaArrowLeft />
            </button>
            <button
              className={
                currentPage >= pageSize ? "disabled" : "pagination__next"
              }
              disabled={currentPage >= pageSize}
              onClick={() =>
                setCurrentPage((current) => {
                  return current + 1;
                })
              }
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="no__data">
          <h1>Keyboard not found</h1>
          <Link to={"/"} className="link">Head Back To HomePage</Link>
        </div>
      )}
    </div>
  );
}

export default Products;
