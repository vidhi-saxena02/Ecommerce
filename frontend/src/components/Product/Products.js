import React from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../AxiosApi/ProductApi";
import Loader from "../Layout/Loader/Loader";
import Product from "../Home/Product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Pagination from "react-js-pagination";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, products, productsCount, resultPerPage } = useSelector(
    (state) => state.product
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products.products &&
              products.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          {resultPerPage < productsCount && (
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
