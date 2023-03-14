import Header from "./components/Layout/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import { React, useEffect } from "react";
import Footer from "./components/Layout/Footer/Footer";

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto:300,400,500,700", "sans-serif"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
