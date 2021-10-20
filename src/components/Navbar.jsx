import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useDataContext } from "../context/DataContext";
import { useForm } from "react-hook-form";
import "./Navbar.css";

const Navbar = () => {
  const { user, getSearchByName } = useDataContext();
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const path = useLocation().pathname;

  const setFocus = () => {
    if (searchBarOpen) document.getElementById("search_input").blur();
    document.getElementById("search_input").focus();
  };

  const getData = (name) => getSearchByName(name);

  const onSubmit = (data) => {
    if (data === Event) {
      data.preventDefault();
    }
    getData(data.Search);
  };

  const onBlur = (e) => {
    if (e.target.value.trim() === "") {
      setSearchBarOpen(false);
      getSearchByName("");
      e.target.value = "";
    }
  };

  const resetSearchByName = () => {
    getSearchByName("");
  };
  useEffect(() => {
    if (path !== "/search") setSearchBarOpen(false);
  }, [path]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
      <div className="container-fluid col-12 col-md-10" style={{ position: "relative" }}>
        <div className={`col-10 col-sm-7  d-flex justify-content-center ${!searchBarOpen ? "z_index" : null}`}>
          <Link
            className={`navbar-brand ${path === "/" ? "line text-white" : null} `}
            to="/"
            onClick={resetSearchByName}
          >
            Home
          </Link>
          <Link
            className={`navbar-brand ${path === "/my-to-watch-list" ? "line text-white" : null} `}
            to="/my-to-watch-list"
            onClick={resetSearchByName}
          >
            To Watch
          </Link>
          <Link
            className={`navbar-brand ${path === "/my-watched" ? "line text-white" : null} `}
            to="/my-watched"
            onClick={resetSearchByName}
          >
            Watched
          </Link>
          {user && (
            <Link
              className={`navbar-brand ${path === `/profile/${user.id}` ? "line text-white" : null} `}
              to={`/profile/${user.id}`}
              onClick={resetSearchByName}
            >
              {user?.name.split(" ").slice(0, 1)}
            </Link>
          )}
        </div>

        <form
          className="col-12 col-sm-5 search_container"
          onSubmit={(e) => handleSubmit(e.preventDefault())}
          onChange={handleSubmit(onSubmit)}
          onFocus={() => setSearchBarOpen(true)}
          onBlur={onBlur}
        >
          <input
            className="form-control me-2 form_control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: searchBarOpen ? "100%" : "40px", transition: "all 1s" }}
            {...register("Search")}
            id="search_input"
          />
          <img
            src="/images/searchClose.png"
            alt="search"
            title="search"
            className="search_image"
            onClick={() => setFocus()}
            style={{ cursor: "pointer", display: searchBarOpen ? "none" : "block" }}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
