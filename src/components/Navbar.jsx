import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import { useForm } from "react-hook-form";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser, getSearchByName } = useDataContext();
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

  const Logout = ()=>{
    localStorage.removeItem("user_project_cambur");
    setUser();
  }

  const resetSearchByName = () => {
    getSearchByName("");
  };
  useEffect(() => {
    if (path !== "/search") setSearchBarOpen(false);
  }, [path]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid col-12 col-md-10" style={{ position: "relative" }}>
          <Link
            className={`navbar-brand ${path === "/" ? "line text-white" : null} `}
            to="/"
            onClick={resetSearchByName}
          >
            Home
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`navbar-brand ${path === "/my-to-watch-list" ? "line text-white" : null} `}
                  to="/my-to-watch-list"
                  onClick={resetSearchByName}
                  aria-current="page"
                >
                  To Watch
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`navbar-brand ${path === "/my-watched" ? "line text-white" : null} `}
                  to="/my-watched"
                  onClick={resetSearchByName}
                >
                  Watched
                </Link>
              </li>
            </ul>
            {user && (
              <div className="d-flex justify-content-around">
                <form
                  className="search_container col-10"
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
                    id="search_input"
                    style={{ width: searchBarOpen ? "100%" : "40px", transition: "all 1s" }}
                    {...register("Search")}
                  />
                  <div className="position-relative">
                    <img
                      src="/images/searchClose.png"
                      alt="search"
                      title="search"
                      className="search_image"
                      onClick={() => setFocus()}
                      style={{ cursor: "pointer", display: searchBarOpen ? "none" : "block" }}
                    />
                  </div>
                </form>
                <div>
                  <div
                    type="button"
                    className={`dropdown-toggle navbar-brand ${path === `/profile/${user.id}` ? "line text-white" : null} `}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user?.name.split(" ").slice(0, 1)}
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to={`/profile/${user.id}`}>
                        <b>Profile</b>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={Logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
