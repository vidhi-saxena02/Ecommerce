import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../AxiosApi/ProductApi";
import { useParams } from "react-router-dom";

const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  return (
    <>
      <div className="ProductDetail">
        {console.log(product)}
        <Carousel>
          {product.product &&
            product.product.images.map((img, i) => (
              <img key={img.url} src={img.url} alt={`${i} Slide`} />
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductDetails;
