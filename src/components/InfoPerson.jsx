import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { GetPersonById } from "../services/GetPerson";
import { GetMoviesByPersonId } from "../services/GetMovies";
import { GetTvShowsByPersonId } from "../services/GetTvShows";
import "./Info.css";
import { useDataContext } from "../context/DataContext";

const InfoPerson = () => {
  const { id } = useParams();
  const {searchByName} = useDataContext();
  const [person, setPerson] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [popularAllWorks, setPopularAllWorks] = useState();
  useEffect(() => {
    const GetData = async () => {
      const data = await GetPersonById(id);
      setPerson(data);
    };
    const GetMovies = async () => {
      const data = await GetMoviesByPersonId(id);

      const dataCast = data.cast.map((dCast) => ({ media_type: "movie", ...dCast }));
      const populars = dataCast
        .sort((a, b) => {
          if (a.vote_count < b.vote_count) {
            return 1;
          }
          if (a.vote_count > b.vote_count) {
            return -1;
          }
          return 0;
        })
        .slice(0, 10);
      setPopularMovies(populars);
    };
    const GetTvShows = async () => {
      const data = await GetTvShowsByPersonId(id);
      const dataCast = data.cast.map((dCast) => ({ media_type: "tv", ...dCast }));
      const populars = dataCast
        .sort((a, b) => {
          if (a.vote_count < b.vote_count) {
            return 1;
          }
          if (a.vote_count > b.vote_count) {
            return -1;
          }
          return 0;
        })
        .slice(0, 10);
      setPopularTv(populars);
    };

    GetTvShows();
    GetData();
    GetMovies();
  }, [id]);

  useEffect(() => {
    if (popularMovies || popularTv) {
      const works = [popularMovies, popularTv]
        .flat()
        .sort((a, b) => {
          if (a.vote_count < b.vote_count) {
            return 1;
          }
          if (a.vote_count > b.vote_count) {
            return -1;
          }
          return 0;
        })
        .slice(0, 10);
      setPopularAllWorks(works);
    }
  }, [popularMovies, popularTv]);

  const history = useHistory();

  if (searchByName) {
    history.push("/search");
  }
  return (
    <>
      {person ? (
        <div className="card my-3 col-xl-9 col-10 m-auto">
          <div className="row g-0">
            <div className="col-md-12 col-lg-4 col-xl-4 bg-light">
              <div className="title_person">
                <h4 className="mb-0">
                  {person.name}
                  <spam class="text-muted h5"> ({person.known_for_department})</spam>
                </h4>
                <spam className="d-block">{person.place_of_birth}</spam>
                <b className="d-block">{person.birthday}</b>
              </div>
              <div className="profife_responsive">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                  className="img-fluid rounded-start profile_picture"
                  alt={person.name}
                  title={person.name}
                />
                {popularAllWorks ? (
                  <div className="profile_works">
                    <b> Popular Works: </b>
                    <ul>
                      {popularAllWorks.map(
                        (work, index) =>
                          work && (
                            <Link
                              to={work.media_type === "tv" ? `/info/tv/${work.id}` : `/info/movie/${work.id}`}
                              className="col-6 text-decoration-none"
                              key={index}
                            >
                              <li>{work.original_title || work.name}</li>
                            </Link>
                          )
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center mt-3">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="card-body">
                <div className="bio_info">
                  <b>Biografy:</b>
                  <p className="card-text">{person.biography}</p>
                </div>
                <hr />
                <span className="d-block">
                  <b>Popularity: </b>
                  {person.popularity}
                </span>
                {popularAllWorks ? (
                  <div className="pupular_works">
                    <b> Popular Works: </b>
                    <ul className="row">
                      {popularAllWorks.map(
                        (work, index) =>
                          work && (
                            <Link
                              to={work.media_type === "tv" ? `/info/tv/${work.id}` : `/info/movie/${work.id}`}
                              className="col-12 col-sm-6 text-decoration-none"
                              key={index}
                            >
                              <li>{work.original_title || work.name}</li>
                            </Link>
                          )
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center mt-3">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPerson;
