import { Link } from "react-router-dom";

const CardPerson = ({ person }) => {
  if (!person.profile_path) {
    return null;
  }
  return (
    <div className="wrap_card">
      <Link to={`/info/person/${person.id}`} className="link_card">
        <div className="info_card">
          <h4 className="text-center text-warning">{person.name}</h4>
          <h5 className="mb-0">Known for:</h5>
          <ul>
            {person.known_for.map((known, index) => (
              <li key={index}>{known.original_title || known.original_name}</li>
            ))}
          </ul>
          <div className="bottom_card_info text-warning">
            <span>Popularity: {person.popularity}</span>
          </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} className="row_card" />
      </Link>
    </div>
  );
};

export default CardPerson;
