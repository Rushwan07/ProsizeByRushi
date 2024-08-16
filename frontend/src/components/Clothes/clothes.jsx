import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Footer from "../../components/Footer/footer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./clothes.scss";

import { useProductContext } from "../../hooks/useProductContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Clothes = () => {
  const { products, dispatch } = useProductContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [cloths, setCloths] = useState("");

  const location = useLocation();
  const { fromHome } = location.state;
  let data = fromHome;

  const RemoveFromFav = async (userId, productId) => {
    // setIsLoading(true)
    setError(null);

    const response = await fetch("/api/user/favorite/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const json = await response.json();

    if (!response.ok) {
      //   setIsLoading(false)
      setError(json.error);
    }
    if (response.ok) {
      setError("Removed");
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: { _id: productId, userId },
      });
    }
    console.log(error);
  };
  const Addfav = async (userId, productId) => {
    setError(null);

    const response = await fetch("/api/user/favorite/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError("Added");
      dispatch({ type: "ADD_FAVORITE", payload: { _id: productId, userId } });
    }
    console.log(error);
  };

  useEffect(() => {
    const getClothes = async () => {
      const response = await fetch("/api/cloth/" + data);
      const json = await response.json();
      if (response.ok) {
        setCloths(json);
        dispatch({ type: "GET_PRODUCTS", payload: json });
      }
    };
    getClothes();
  }, [data]);

  return (
    <div className="clothes container">
      <div className="one">
        <h2>MEN'S {data}</h2>
        <small className="">
          Dress up your everyday look with our men's {data}. We have slim- and
          regular-fit {data} to match your mood as well as your plans – think
          everything from classic Grandad and oxford {data}.
        </small>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div>
            <TuneOutlinedIcon /> FILTER & SORT
          </div>
          <div>{cloths.length} items</div>
        </div>
      </div>

      <div className="cardz mt-5 d-flex justify-content-center flex-wrap">
        {products &&
          products.map((cloth) => (
            <div className="car">
              <img src={cloth.images[1]} alt={cloth.images[1]} />
              <div className="heart">
                {cloth.favorites.includes(user.id) ? (
                  <FavoriteIcon
                    sx={{ fontSize: 40, color: "red" }}
                    onClick={() => RemoveFromFav(user.id, cloth._id)}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => Addfav(user.id, cloth._id)}
                    sx={{ fontSize: 40, color: "white" }}
                  />
                )}
              </div>
              <div className="mt-3">
                <Link to={"/view/" + cloth._id}>
                  <a href="/">{cloth.heading}</a>
                </Link>
                <h4>Rs.{cloth.price}</h4>
                <h5>New Arrival</h5>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Clothes;
