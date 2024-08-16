import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./nav.scss";
import screenshotImage from "../../images/logo.png";
import { useLogout } from "../../hooks/useLogout";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from "../../hooks/useLogin";

const Nav = ({ setQuery, query }) => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { signup, error, data } = useSignup();
  const { login, error2, data2 } = useLogin();
  const { logout } = useLogout();
  // const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(firstname, lastname, email, password);
    await signup(firstname, lastname, email, password);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };
  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <nav className="container navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <img src={screenshotImage} alt="" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="itemdiv collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <a
                    className="nav-link active "
                    onClick={() => setQuery("")}
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Collections
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      onClick={() => setQuery("")}
                      to="/clothes"
                      state={{ fromHome: "Shirts" }}
                      className="dropdown-item"
                    >
                      Shirts
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setQuery("")}
                      to="/clothes"
                      state={{ fromHome: "Pants" }}
                      className="dropdown-item"
                    >
                      Pants
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setQuery("")}
                      to="/clothes"
                      state={{ fromHome: "T-Shirts" }}
                      className="dropdown-item"
                    >
                      T-Shirts
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setQuery("")}
                      to="/clothes"
                      state={{ fromHome: "Jackets" }}
                      className="dropdown-item"
                    >
                      Jackets
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => setQuery("")}
                  aria-current="page"
                  href="/"
                >
                  Track Your order
                </a>
              </li>
            </ul>
            <form className="d-flex align-items-center">
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <SearchOutlinedIcon />
            </form>
            <div className="muicons mx-2 d-flex align-items-center">
              <Link to={"/cart"}>
                <ShoppingBagOutlinedIcon
                  onClick={() => setQuery("")}
                  sx={{ color: "black" }}
                />
              </Link>
              <Link to={"/favorite"}>
                {/* <FavoriteOutlinedIcon onClick={() => setQuery('')}  sx={{ color: "red" }} /> */}
                <FavoriteBorderOutlinedIcon
                  onClick={() => setQuery("")}
                  sx={{ color: "#222" }}
                />
              </Link>

              {!user && (
                <button
                  type="button"
                  className=""
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <AccountCircleOutlinedIcon
                    sx={{ fontSize: 25, color: "black", background: "white" }}
                  />
                </button>
              )}
              {user && (
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b className="text-dark">
                      {user.name} {user.lastname}
                    </b>
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <h5
                        class="dropdown-item"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                      >
                        Order History
                      </h5>
                    </li>
                    <li>
                      <h5
                        class="dropdown-item"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={handleClick}
                      >
                        Logout
                      </h5>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Login Modal start here @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="container modal-title"
                    id="staticBackdropLabel"
                  >
                    <b>Sign in</b>
                    {error2 && (
                      <div className="text-danger">
                        <b>{error2}</b>
                      </div>
                    )}
                    {data2 && (
                      <div className="text-success">
                        <b>{data2}</b>
                      </div>
                    )}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handlelogin}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Email
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <div className="d-flex justify-content-between">
                        <label className="form-check-label" for="exampleCheck1">
                          Remember me
                        </label>
                        <a href="/">Forget password?</a>
                      </div>
                    </div>
                    <div className="container">
                      <button type="submit" className="button1">
                        <b>Sign in</b>
                      </button>
                      <button
                        type="button"
                        className="button2 mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop2"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <b>Become a member</b>
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <img src={screenshotImage} alt="" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="staticBackdrop2"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdrop2Label"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title container"
                    id="staticBackdrop2Label"
                  >
                    <b>
                      Become an ProsizeByRushi member.
                      {data && <div className="text-success">{data}</div>}
                      {error && <div className="text-danger">{error}</div>}
                    </b>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        for="exampleInputFirstname2"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputFirstname2"
                        aria-describedby="nameHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputLastname2" className="form-label">
                        Last name
                      </label>
                      <input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputLastname2"
                        aria-describedby="nameHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputEmail2" className="form-label">
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword2" className="form-label">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <div className="mt-1">
                        <p>
                          Find out what's hot and happening in the world of
                          fashion, beauty, and home decor. Plus, you'll get
                          bonus vouchers, birthday offers, and special invites
                          to sales and events – straight to your inbox!
                        </p>
                        <small>
                          By clicking ‘Become a member’, I agree to the
                          ProsizeByRushi Membership
                        </small>
                        <a href="/"> Terms and conditions.</a>
                      </div>
                    </div>
                    <div className="container">
                      <button type="submit" className="button1">
                        <b>Become an PSBR member</b>
                      </button>
                      <button
                        type="button"
                        className="button2 mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <b>Sign in</b>
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <img src={screenshotImage} alt="" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
