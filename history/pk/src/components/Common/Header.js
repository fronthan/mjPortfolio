import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header" role="navigation">      
        <div className="header_wrap">
          <Link to="/" className="pk_logo">
            <img src="./logo_pk.svg" alt="" width="172" />
          </Link>
          <Link to="/search" className="icon_search">
            <img src="./icon_search.svg" alt="" width="26" />
          </Link>
        </div>
    </header>
  );
}

export default Header;
