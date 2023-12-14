import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
function NavBar() {
  const [searchItem, setSearchItem] = useState  ("");
  const navigate = useNavigate();
    
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchItem}`);
  };

  return (
    <div className="navbar">
      <div className="header">
        <Link to={"/"} className="navbar__link">
          {" "}
          KeysFinder
        </Link>
        
        {/* <div className="landing__search">
          <GoSearch />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="What keyboard are you looking for? "
            />
            <button type="submit">Search</button>
          </form>
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;
