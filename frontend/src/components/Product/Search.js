import React from "react";
import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search a Product"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
