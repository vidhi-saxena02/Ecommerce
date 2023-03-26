import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../AxiosApi/ProductApi";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import { useToasts } from "@geist-ui/core";
import { clearErrors } from "../../store/store";

const ProductDetails = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setToast } = useToasts();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (error) {
      if (error) {
        setToast({
          text: error,
          type: "error",
        });
        dispatch(clearErrors());
      }
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error]);

  const val = product.product && product.product.rating;
  const options = {
    edit: false,
    color: "rgba(20, 20,20, 0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    value: val,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetail">
            <div>
              <Carousel>
                {product.product &&
                  product.product.images.map((img, i) => (
                    <img
                      className="caraouselImage"
                      key={img.url}
                      src={img.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.product && product.product.name}</h2>
                <p>Product # {product.product && product.product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>
                  ({product.product && product.product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>₹{product.product && product.product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="text" inputmode="numeric" value="1" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product.product && product.product.Stock < 1
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {product.product && product.product.Stock < 1
                      ? "Out of Stock"
                      : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                <p>
                  {" "}
                  Description :{" "}
                  <span>
                    {console.log(product.product)}
                    {product.product && product.product.productDescription}
                  </span>
                </p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.product && product.product.reviews.length === 0 ? (
            <p className="noReviews">No Reviews</p>
          ) : (
            <div className="reviews">
              {product.product &&
                product.product.reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
