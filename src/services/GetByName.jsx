import { apiKEY } from "../apiKEY";

export const SearchByName = async (name) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKEY}&language=en-US&page=1&include_adult=false&query=${name}`
  );
  const json = await data.json();
  return json;
};
