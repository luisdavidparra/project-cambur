import { apiKEY } from "../apiKEY";

export const GetTvShowById = async (id) => {
  const res = await fetch(`
https://api.themoviedb.org/3/tv/${id}?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const GetTvShowCastById = async (id) => {
  const res = await fetch(`
https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const GetTvShowsByPersonId = async (id) => {
  const res = await fetch(`
https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const PopularTvShows = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKEY}&language=en-US&page=1`);
  const json = data.json();
  return json;
};

export const TopRatedTvShows = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKEY}&language=en-US&page=1`);
  const data = await res.json();
  return data;
};

export const TvShowProviders = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKEY}`);
  const data = await res.json();
  return data;
};