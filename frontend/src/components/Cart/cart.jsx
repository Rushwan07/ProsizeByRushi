import React, { useEffect, useState } from "react";
import "./cart.scss";
import Footer from "../../components/Footer/footer";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useProductContext } from "../../hooks/useProductContext";
import { Link } from "react-router-dom";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const Cart = () => {
  const { cart = [], dispatch } = useProductContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const deliveryCost = 149;
  const totalWithDelivery = totalPrice + deliveryCost;

  useEffect(() => {
    if (!user) return; // Ensure user is defined

    const getCart = async () => {
      try {
        const response = await fetch("/api/user/getcart/" + user.id);
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        } else {
          dispatch({ type: "GET_CART", payload: json });
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getCart();
  }, [user, dispatch]); // Add user and dispatch as dependencies

  console.log(error);
  const removeFromCart = async (userId, productId) => {
    setError(null);

    const response = await fetch("/api/user/cart/remove", {
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
        type: "REMOVE_FROM_CART",
        payload: { _id: productId, userId },
      });
    }
  };

  return (
    <div className="cart container ">
      <div className="d-flex justify-content-center">
        <div className="notch mt-5">
          <h4>Free shipping above Rs.1999</h4>
          <h4>Estimated delivery time: 2-7 days</h4>
          <h4>Free & flexible 15 days return</h4>
        </div>
      </div>

      {cart.length !== 0 && (
        <h2 className="mt-3 text-center">
          <b>Shopping bag</b>
        </h2>
      )}

      <div className="bag mt-5 mb-5">
        <div className="left">
          {cart.length === 0 ? (
            <>
              <div className="mt-3  d-flex justify-content-center align-items-center">
                <h2 className="">
                  <b>Shopping bag is empty</b>
                </h2>
              </div>
            </>
          ) : (
            cart &&
            cart.map((product) => (
              <div key={product._id} className="car mt-2">
                <img src={product.images[2]} alt="" />

                <div className="text">
                  <div className="item1">
                    <div className="">
                      <Link to={"/view/" + product._id}>
                        <a href="/">{product.heading}</a>
                      </Link>
                      <h3>Rs.{product.price}</h3>
                    </div>
                    <div>
                      <DeleteOutlineOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromCart(user.id, product._id)}
                        sx={{ fontSize: 25 }}
                      />
                    </div>
                  </div>
                  <div className="item2 mt-2">
                    <h5>Size:</h5>
                    <h5>
                      {
                        product.addToCart.find(
                          (item) => item.cart.toString() === user?.id
                        )?.user_size
                      }
                    </h5>
                    <h5>Total:</h5> <h5>{product.price}</h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="right">
          {/* <small className="text-muted">
            Log in to use your personal offers!
          </small>
          <div className="item1 text-center ">
            <div>
              <button>Sign in</button>
            </div>
          </div> */}
          <hr />

          {cart &&
            cart.map((product) => (
              <div className="d-flex justify-content-between mt-1 align-items-center">
                <small className="text-muted">Order value</small>
                <small className="text-muted">Rs. {product.price}.00</small>
              </div>
            ))}

          {cart.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <small className="text-muted">Delivery</small>
                <small className="text-muted ">Rs. 149.00</small>
              </div>
              <hr className="" />
              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5>Rs. {totalWithDelivery}</h5>
              </div>
              {/* <button className="mt-4">Continue to checkout</button> */}
            </>
          )}

          <button
            type="button"
            class="btn btn-primary mt-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop3"
          >
            Continue to checkout
          </button>

          <div
            class="modal fade"
            id="staticBackdrop3"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdrop3Label"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdrop3Label">
                    Order Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body modal-scrollable">
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputAddress" class="form-label">
                        <small>Address</small>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputAddress"
                      />
                      <small className="text-muted">Street Address</small>
                      <div className="d-flex align-items-center">
                        <ErrorOutlineOutlinedIcon />
                        Include house number, where relevant
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPincode" class="form-label">
                        <small>Phone</small>
                      </label>
                      <input
                        type="tel"
                        class="form-control"
                        id="exampleInputPincode"
                      />
                    </div>
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                    >
                      <option selected>Select State</option>
                      <option value="1">Maharashtra</option>
                      <option value="2">Karnataka</option>
                      <option value="3">Andhra Pradesh</option>
                    </select>

                    <div class="mb-3">
                      <label for="exampleInputTown" class="form-label">
                        <small>Town/City</small>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputTown"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPincode" class="form-label">
                        <small>Pincode</small>
                      </label>
                      <input
                        type="tel"
                        class="form-control"
                        id="exampleInputPincode"
                      />
                    </div>

                    <hr />
                    <h5>Select payment option</h5>

                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Cash on deleviry
                      </label>
                    </div>
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        UPI Payment
                      </label>
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Order
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  {/* <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5>We accept</h5>
            <p>Cash on Delivery, And all the Payment Gateways!</p>
          </div>
          <div className="">
            <p className="text-muted">
              Prices and delivery costs are not confirmed until you've reached
              the checkout. 15 days free returns. Read more about return and
              refund policy. Customers would receive an SMS/WhatsApp
              notifications regarding deliveries on the registered phone number
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
