import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../Layout/MetaData";
import { getProducts } from "../../AxiosApi/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useToasts } from "@geist-ui/core";
import { clearError } from "../../AxiosApi/ProductApi";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.product);

  const { setToast } = useToasts();

  useEffect(() => {
    if (error) {
      setToast({
        text: error,
        type: "error",
      });
      clearError();
    }
    dispatch(getProducts());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to ECM</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
              <button>
                Explore <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeheading">Featured Products</h2>

          <div className="container" id="container">
            {products.products &&
              products.products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
