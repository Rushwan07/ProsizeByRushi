import React, { useEffect, useState } from "react";
import "./home.scss";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState("");
  // const [shirt, setShirt] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/cloth/");
      const json = await response.json();
      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <div className="home container">
      <div className="cards">
        {products &&
          products.slice(0, 4).map((product) => (
            <div className="card" key={product._id}>
              <img src={product.images[2]} alt="" />
              <Link to={"/view/" + product._id}>
                <div className="text text-center">
                  <h4>{product.heading}</h4>
                  <small className="">{product.description}</small>
                </div>
              </Link>
            </div>
          ))}
        {/* <div className="card">
          <img
            src="https://yucollective.com/cdn/shop/files/2_desk_1.jpg?v=1712471196&width=1426"
            alt=""
          />
          <div className="text text-center">
            <h4>TROUSERS</h4>
            <small className="">
              AN ESTABLISHMENT OF TIMELES DESIGNS SERVING A BOLD PROCLAMATION OF
              ENDURING ELEMENTS.A HARMONY BETWEEN REFINED AND EASY GOING.
            </small>
          </div>
        </div>
        <div className="card">
          <img
            src="https://yucollective.com/cdn/shop/files/3-desk_1.jpg?v=1712471412&width=1426"
            alt=""
          />
          <div className="text text-center">
            <h4>SHIRTS</h4>
            <small className="">
              AN ESTABLISHMENT OF TIMELES DESIGNS SERVING A BOLD PROCLAMATION OF
              ENDURING ELEMENTS.A HARMONY BETWEEN REFINED AND EASY GOING.
            </small>
          </div>
        </div>
        <div className="card">
          <img
            src="https://yucollective.com/cdn/shop/files/4_Custom_1.jpg?v=1712468661&width=1426"
            alt=""
          />
          <div className="text text-center">
            <h4>SHIRTS</h4>
            <small className="">
              AN ESTABLISHMENT OF TIMELES DESIGNS SERVING A BOLD PROCLAMATION OF
              ENDURING ELEMENTS.A HARMONY BETWEEN REFINED AND EASY GOING.
            </small>
          </div>
        </div>
        <div className="card">
          <img
            src="https://yucollective.com/cdn/shop/files/1_desk_1.jpg?v=1712471151&width=1426"
            alt=""
          />
          <div className="text text-center">
            <h4>NEW IN - LINEN</h4>
            <small className="">
              AN ESTABLISHMENT OF TIMELES DESIGNS SERVING A BOLD PROCLAMATION OF
              ENDURING ELEMENTS.A HARMONY BETWEEN REFINED AND EASY GOING.
            </small>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
