import React from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../AxiosApi/ProductApi";
import Loader from "../Layout/Loader/Loader";
import Product from "../Home/Product";
import MetaData from "../Layout/MetaData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useToasts } from "@geist-ui/core";
import { clearError } from "../../AxiosApi/ProductApi";

const categories = [
  "Laptops",
  "Footwear",
  "Bottom",
  "Tops",
  "Accessories",
  "Cameras",
  "Smartphones",
  "Cosmetics",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  const priceHandler = (e, newValue) => {
    setPrice(newValue);
  };
  const { loading, products, productsCount, resultPerPage, error } =
    useSelector((state) => state.product);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const { setToast } = useToasts();

  useEffect(() => {
    if (error) {
      setToast({
        text: error,
        type: "error",
      });
      clearError();
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = productsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products--Ecommerce" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products.products &&
              products.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Catagories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  key={category}
                  className="category-link"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Typography className="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              valueLabelDisplay="auto"
            />
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemactive"
                activeLinkClass="pageLinkactive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
