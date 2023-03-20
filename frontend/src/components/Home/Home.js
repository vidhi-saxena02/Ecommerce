import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../Layout/MetaData";
import { getProducts } from "../../AxiosApi/ProductApi";
import { useDispatch, useSelector } from "react-redux";

const product = {
  name: "Tshirt",
  price: 3000,
  _id: "1",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
};

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
