import React from "react";
import "./tracker.scss";
import Footer from "../../components/Footer/footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Tracker = () => {
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const { user } = useAuthContext();
  const currentStep = 2;
  console.log(user);

  return (
    <div className="container">
      {user?.purchase?.map((prod, index) => (
        // <h1 key={index}>{prod.product?.heading}</h1>
        <div className="boxs" key={index}>
          <div className="img">
            <img src={prod.product?.images[0]} alt="" />
          </div>
          <div className="details">
            <Link
              to={"/view/" + prod.product?._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="inf">{prod.product?.heading}</div>
            </Link>
            <div className="addresinfo">{prod.product?.description}</div>
            <div className="track">
              <div className="steps">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`step ${index <= currentStep ? "active" : ""}`}
                  >
                    <div className="circle">{index + 1}</div>
                    <div className="label">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Tracker;
