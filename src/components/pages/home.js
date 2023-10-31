import React from 'react';
import { NavLink } from "react-router-dom";

import FrontPageImg from "../images/front-page.jpg"

export default function() {
    return (
        <div>
            <div className="front-img">
              <img src={FrontPageImg} alt="Front-page img" />
            
              <NavLink to="/products">
                <button className="enter-btn">ENTER</button>
              </NavLink>
            </div>
        </div>
    );
}