import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import ShopLogo from "../images/shop-logo.png"
import { FaRegUser, FaRightFromBracket, FaBasketShopping } from "react-icons/fa6";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .get("https://the-basque-shop-backend-r-production.up.railway.app/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.handleSuccessfulLogout();
          console.log("sesion cerrada con exito")
          props.history.push("/");
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };

  return (
    <div className="nav-wrapper">
      <div className="shop-logo">
        <img src={ShopLogo} alt="Logo img" />
      </div>

      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/products" activeClassName="nav-link-active">
            Products
          </NavLink>
        </div>

      </div>

      <div className="right-side">
        {props.loggedInStatus === "LOGGED_IN" ? (
            <div className="right-icon">
              <a onClick={handleSignOut}>
                <FaRightFromBracket />
              </a>
            </div>
        ) : (
          <div className="right-icon">
            <NavLink to="/Auth" activeClassName="nav-link-active">
              <FaRegUser />
            </NavLink>
          </div>
        )}

        <NavLink to="/shopping-cart" activeClassName="nav-link-active">
          <div className="right-icon">
            <FaBasketShopping />
          </div>
        </NavLink>

      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);