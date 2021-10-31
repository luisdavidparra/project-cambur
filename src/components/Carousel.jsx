import { useEffect, useState } from "react/cjs/react.development";
import CardMovie from "./CardMovie";
import CardTv from "./CardTv";

const Carousel = ({ popularMovies, popularTv, searchMovies, searchTv }) => {
  const [carousel, setCarousel] = useState();
  // const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    const carouselElement = popularMovies
      ? document.getElementById("carousel_movies")
      : popularTv
      ? document.getElementById("carousel_tv")
      : searchMovies
      ? document.getElementById("carousel_search_movies")
      : document.getElementById("carousel_search_tv");

    setCarousel(carouselElement);
  }, [popularMovies, popularTv, searchMovies, searchTv]);

//   useEffect(() => {
//     if (carousel) {
//         console.log(carousel.scrollWidth);
//       if (carousel?.scrollWidth === carousel.clientWidth) {
//         setShowButtons(false);
//       } else {
//         setShowButtons(true);
//       }
//     }
//   }, [carousel]);

  var scrollPerClick = document.documentElement.clientWidth / 1.2;
  var scrollAmount = 0;

  const onScrollLeft = () => {
    carousel.scrollTo({
      top: 0,
      left: (scrollAmount -= scrollPerClick),
      behavior: "smooth",
    });

    if (scrollAmount < 0) scrollAmount = 0;
  };

  const onScrollRight = () => {
    if (scrollAmount <= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollTo({
        top: 0,
        left: (scrollAmount += scrollPerClick),
        behavior: "smooth",
      });
    } else {
      carousel.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      scrollAmount = 0;
    }
  };
  return (
    <>
      <div className="position-relative">
        <div
          onClick={() => onScrollLeft()}
          className={`button_left `}
          id="button_left"
        >
          <div className="position-relative">
            <img src="/images/arrow_left.png" alt="left" name="left" />
          </div>
        </div>
        <div
          onClick={() => onScrollRight()}
          className={`button_right`}
          id="button_right"
        >
          <div className="position-relative">
            <img src="/images/arrow_left.png" alt="left" name="left" />
          </div>
        </div>
        <div
          className="row__card"
          id={
            popularMovies
              ? "carousel_movies"
              : popularTv
              ? "carousel_tv"
              : searchMovies
              ? "carousel_search_movies"
              : "carousel_search_tv"
          }
        >
          {popularMovies
            ? popularMovies.map((movie, id) => <CardMovie movie={movie} key={id} />)
            : popularTv
            ? popularTv.map((tv, id) => <CardTv tv={tv} key={id} />)
            : searchMovies
            ? searchMovies.map((movie, id) => <CardMovie movie={movie} key={id} />)
            : searchTv.map((tv, id) => <CardTv tv={tv} key={id} />)}
        </div>
      </div>
    </>
  );
};

export default Carousel;
