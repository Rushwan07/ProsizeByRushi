import React, { useEffect, useState } from "react";
import "./favorite.scss";
import Footer from "../../components/Footer/footer";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useProductContext } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";
const Favorite = () => {
  const [error, setError] = useState(null);
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getFavorite = async () => {
      try {
        const response = await fetch(`/api/user/favorite/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Favorites");
        }
        const json = await response.json();
        dispatch({ type: "GET_FAVORITES", payload: json });
      } catch (error) {
        console.error("Error fetching Favorites:", error);
      }
    };
    getFavorite();
  });

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

  return (
    <div className="favorite container">
      <h2 className="mt-5 text-center">
        <b>Favorites</b>
      </h2>
      <small className="container text-muted d-flex justify-content-end">
        <b>
          {products?.length} item{products?.length !== 1 && "s"}
        </b>
      </small>

      {products ? (
        <div className="cards mt-5 mb-5">
          {products &&
            products.map((cloth) => (
              <div class="card" key={cloth._id}>
                <img src={cloth.images[1]} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={"/view/" + cloth._id}>
                      <a style={{ color: "#222" }} href="/">
                        {cloth.heading}
                      </a>
                    </Link>
                    {/* <h5 class="card-title">{cloth.heading}</h5> */}
                    <DeleteOutlineOutlinedIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => RemoveFromFav(user.id, cloth._id)}
                      sx={{ fontSize: 25 }}
                    />
                  </div>
                  <h5>Rs.{cloth.price}.00</h5>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center mt-5">Zero Favorites</p>
      )}

      <Footer />
    </div>
  );
};

export default Favorite;
