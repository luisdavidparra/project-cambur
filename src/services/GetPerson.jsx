import { apiKEY } from "../apiKEY";

export const GetPersonById = async (id) => {
  const res = await fetch(`
  https://api.themoviedb.org/3/person/${id}?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};
