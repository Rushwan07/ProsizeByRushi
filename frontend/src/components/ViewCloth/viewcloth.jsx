import React, { useEffect, useState } from "react";
import "./viewcloth.scss";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Footer from "../../components/Footer/footer";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useProductContext } from "../../hooks/useProductContext";

const Viewcloth = () => {
  const [userSize, setUserSize] = useState("");
  const { product, dispatch } = useProductContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { id } = useParams();

  const removeFromFav = async (userId, productId) => {
    setError(null);

    const response = await fetch("/api/user/favorite/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError("Removed");
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: { _id: productId, userId },
      });
    }
  };

  const addFav = async (userId, productId) => {
    setError(null);

    const response = await fetch("/api/user/favorite/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError("Added");
      dispatch({ type: "ADD_FAVORITE", payload: { _id: productId, userId } });
    }
  };

  const addToCart = async (userId, productId, user_size) => {
    setError(null);

    console.log(userId, productId, user_size);
    const response = await fetch("/api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, user_size }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError("Added to cart");
      // dispatch({ type: "ADD_TO_CART", payload: json });
    }
  };

  useEffect(() => {
    const fetchCloth = async () => {
      try {
        const response = await fetch(`/api/cloth/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cloth data");
        }
        const data = await response.json();
        dispatch({ type: "GET_PRODUCT", payload: data });
      } catch (error) {
        console.error("Error fetching cloth data:", error);
        setError("Failed to fetch product data.");
      }
    };

    fetchCloth();
  }, [id, dispatch]);

  if (!product || !user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container view mt-5">
      {product && (
        <div className="divs d-flex flex-wrap justify-content-center">
          <div className="left d-flex">
            {product.images && product.images.length > 0 && (
              <img src={`/${product.images[0]}`} alt="Cloth" />
            )}
          </div>
          <div className="right">
            <div className="top">
              <div>
                <h4>{product.heading}</h4>
                <h5 className="text-muted">MRP inclusive of all taxes</h5>
                <h4>Rs.{product.price}.00</h4>
              </div>

              <div style={{ cursor: "pointer" }}>
                {product.favorites.includes(user.id) ? (
                  <FavoriteIcon
                    sx={{ fontSize: 40, color: "red" }}
                    onClick={() => removeFromFav(user.id, product._id)}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => addFav(user.id, product._id)}
                    sx={{ fontSize: 40, color: "black" }}
                  />
                )}
              </div>
            </div>
            <h4 className="mt-5" style={{ fontSize: "0.8rem" }}>
              Sizes
            </h4>
            <div className="sizes">
              {product.sizes.map((size, index) => (
                <div className="size" key={index}>
                  <button
                    onClick={(e) => setUserSize(e.target.value)}
                    value={size.name}
                  >
                    {size.name}
                  </button>
                  {size.amount <= 5 && (
                    <small className="text-danger">
                      only {size.amount} left
                    </small>
                  )}
                </div>
              ))}
            </div>
            <div className="middle container mt-5">
              {error && (
                <div className="text-success">
                  <b>{error}</b>
                </div>
              )}
              <button
                className="mt-1"
                onClick={() => addToCart(user.id, product._id, userSize)}
              >
                <ShoppingBagOutlinedIcon
                  sx={{ fontSize: 20, color: "white" }}
                />
                Add
              </button>
              <div className="mt-4">
                <h5 className="d-flex align-items-center">
                  <StoreMallDirectoryOutlinedIcon />
                  Not available in stores
                </h5>
                <h5 className="d-flex align-items-center">
                  <ErrorOutlineOutlinedIcon />
                  Delivery Time : 2-7 days
                </h5>
                <h4>Delivery and Payment</h4>
              </div>
              <div className="mt-5 d-flex align-items-center ">
                <StarOutlinedIcon sx={{ fontSize: 20 }} />
                <StarOutlinedIcon sx={{ fontSize: 20 }} />
                <StarOutlinedIcon sx={{ fontSize: 20 }} />
                <StarOutlinedIcon sx={{ fontSize: 20 }} />
                <div>(6 Reviews)</div>
              </div>
            </div>
            <div className="bottom mt-5">
              <div className="dropdown ">
                <button
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Description & Fit
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>

              <div className="dropdown mt-3">
                <button
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Materials
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <p>{product.material}</p>
                  </li>
                </ul>
              </div>

              <div className="dropdown mt-3">
                <button
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Care guide
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton3"
                >
                  <li>
                    <p>{product.care}</p>
                  </li>
                </ul>
              </div>
              <div className="mt-5 container">
                <h4>
                  <b>Fashion sense</b>
                </h4>

                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae eveniet at fugiat, dolore ab, officia animi laborum
                  tenetur sequi placeat distinctio sunt aspernatur doloremque
                  temporibus cupiditate eligendi iure, dignissimos maxime.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images Section */}
      <div className="imgdiv container mt-3 mb-4">
        <div className="d-flex justify-content-center">
          <div className="topimg">
            {product && product.images && product.images.length > 1 && (
              <img src={`/${product.images[1]}`} alt="Cloth" />
            )}
          </div>
        </div>
        <div className="mt-1 midimg d-flex justify-content-center">
          <div className="mis">
            {product && product.images && product.images.length > 2 && (
              <img src={`/${product.images[2]}`} alt="Cloth" />
            )}
          </div>
          <div className="mis">
            {product && product.images && product.images.length > 3 && (
              <img src={`/${product.images[3]}`} alt="Cloth" />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Viewcloth;
