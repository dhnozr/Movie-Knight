import axios from 'axios';
import { useStore } from '../store/store';
import { useQuery } from 'react-query';
import { supabase } from '../../supabaseClient';

const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;

// filmler icin
const tmdbMovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    apiKey: apiKey,
    language: 'us-US',
  },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_BEARER_TOKEN} `,
  },
});

// tv icin
const tmdbTvApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    apiKey: apiKey,
    language: 'us-US',
  },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_BEARER_TOKEN} `,
  },
});

// fetch movies
export const fetchMovies = async (page = 1) => {
  const { data } = await tmdbMovieApi.get('movie/popular', {
    params: {
      page: page,
    }, // Add the page parameter to the request
  });
  return {
    results: data.results,
    total_pages: data.total_pages, // Include total pages for pagination controls
  };
};

// detayına gittigim film fetch
export const fetchMovie = async id => {
  const { data } = await tmdbMovieApi.get(`movie/${id}`);

  return data;
};

export const fetchSearchedMovie = async text => {
  if (text === '') {
    return;
  }
  const { data } = await tmdbMovieApi.get(`search/movie`, {
    params: {
      query: text,
    },
  });

  return data.results;
};

export const useSearchedMovies = text => {
  const setFetchedMovies = useStore(state => state.setFetchedMovies);

  return useQuery(['fetchedMovies', text], () => fetchSearchedMovie(text), {
    onSuccess: movies => {
      setFetchedMovies(movies);
    },
  });
};

export const fetchMovieTrailer = async id => {
  const { data } = await tmdbMovieApi.get(`movie/${id}/videos`);

  return data.results;
};

// detayına gittigim film cast fetch
export const fetchMovieCast = async id => {
  const { data } = await tmdbMovieApi.get(`movie/${id}/credits`);

  return data.cast.slice(0, 10);
};

// send fetched movies to store
export const useMovies = page => {
  const setMovies = useStore(state => state.setMovies);

  return useQuery(['movies', page], () => fetchMovies(page), {
    onSuccess: movies => {
      setMovies(movies.results);
    },
  });
};

// fetch tvShows
const fetchTvShows = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { data } = await tmdbTvApi.get('tv/popular');
  return data.results;
};

// send fetched shows to store
export const useTvShows = () => {
  const setTvShows = useStore(state => state.setTvShows);

  return useQuery('shows', fetchTvShows, {
    onSuccess: shows => {
      setTvShows(shows);
    },
  });
};

// fetch movie genres

const fetchMovieGenres = async () => {
  const { data } = await tmdbMovieApi.get('/genre/movie/list');
  return data.genres;
};

export const useMovieGenres = () => {
  const setMovieGenres = useStore(state => state.setMovieGenres);

  return useQuery('movieGenres', fetchMovieGenres, {
    onSuccess: movieGenres => {
      setMovieGenres(movieGenres);
    },
  });
};

// supabase fetch
const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const useGetUser = () => {
  const setUser = useStore(state => state.setUser);

  return useQuery('user', getUser, {
    onSuccess: user => {
      setUser(user);
    },
  });
};
