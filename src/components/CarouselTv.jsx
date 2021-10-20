import { useEffect, useState } from "react/cjs/react.development";
import CardMovie from "./CardMovie";
import CardTv from "./CardTv";

const CarouselTv = ({ popularMovies, popularTv, searchMovies, searchTv }) => {
  const [carousel, setCarousel] = useState();
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const carouselElement = document.getElementsByClassName("carousel");
    setCarousel(carouselElement);
  }, []);

  const scrollPerClick = document.documentElement.clientWidth;

  const onScrollLeft = () => {
    carousel.scrollTo({
      top: 0,
      left: setScrollAmount(() => scrollAmount - scrollPerClick),
      behavior: "smooth",
    });

    if (scrollAmount < 0) setScrollAmount(0);
  };

  const onScrollRight = () => {
    if (scrollAmount <= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollTo({
        top: 0,
        left: setScrollAmount(() => scrollAmount + scrollPerClick),
        behavior: "smooth",
      });
    } else {
      carousel.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setScrollAmount(0);
    }
  };
  return (
    <>
      <div className="position-relative">
        <div onClick={() => onScrollLeft()} className="button_left">
          <div className="position-relative">
            <img src="/images/arrow_left.png" alt="left" name="left" />
          </div>
        </div>
        <div onClick={() => onScrollRight()} className="button_right">
          <div className="position-relative">
            <img src="/images/arrow_left.png" alt="left" name="left" />
          </div>
        </div>
        <div className="row__card carousel">
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

export default CarouselTv;
