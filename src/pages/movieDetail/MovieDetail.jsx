import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovie, useGetUser } from '../../components/request';
import { fetchMovieCast } from '../../components/request';
import { useQuery } from 'react-query';
import { motion as m } from 'framer-motion';
import { pageAnimation } from '../../components/animation';
import { fetchMovieTrailer } from '../../components/request';
// ismi önemsiz stagger effect icin container görevi görecek
import { animateMovieContainer } from '../../components/animation';
import { animateCast } from '../../components/animation';
import { supabase } from '../../../supabaseClient';
import { useStore } from '../../store/store';

export const MovieDetail = () => {
  const {} = useGetUser();
  const user = useStore(state => state.user);

  const [showTrailer, setShowTrailer] = useState(false);
  const { id } = useParams();

  const { isLoading, data: movie } = useQuery(['movie', id], () => fetchMovie(id));
  const { data: cast } = useQuery(['cast', id], () => fetchMovieCast(id));
  const { data: trailer } = useQuery(['trailer', id], () => fetchMovieTrailer(id));
  console.log(trailer);

  console.log(movie);

  if (isLoading) return <h2>Loading...</h2>;

  const officialTRrailer = trailer?.find(video => video.type === 'Trailer');

  const addFavorite = async () => {
    const { data: existingFavorites, error: existingError } = await supabase
      .from('favoriteMovies')
      .select('*')
      .eq('user_id', user.id)
      .eq('movie_id', movie.id);

    if (existingError) {
      console.error('Error checking for existing favorite movie: ', existingError);
      return;
    }

    // If the movie is already a favorite, don't insert it again
    if (existingFavorites.length > 0) {
      console.log('Movie is already in favorites');
      return;
    }

    const { data, error } = await supabase.from('favoriteMovies').insert([
      {
        user_id: user?.id,
        movie_id: movie?.id,
        movie_title: movie?.title,
        movie_poster_path: movie?.backdrop_path,
      },
    ]);
  };

  return (
    <>
      <Wrapper variants={pageAnimation} initial='hidden' animate='show' exit={'exit'}>
        <MovieImgWrapper>
          <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt='' />
          <WatchTrailer onClick={setShowTrailer}>
            <button>TRAILER</button>
          </WatchTrailer>
        </MovieImgWrapper>
        <MovieDetailWrapper>
          <MovieTitle variants={animateCast}>
            <h1>{movie?.title}</h1>
            <h2>{movie?.tagline}</h2>
          </MovieTitle>
          <Genres>
            {movie?.genres.map(genre => (
              <div key={genre.id}>
                <p>{genre.name}</p>
              </div>
            ))}
            <p>{movie?.release_date}</p>
          </Genres>
          <Overview variants={animateCast}>
            <h2>Overview</h2>
            <p>{movie?.overview}</p>
          </Overview>
          <h2>Cast</h2>
          <CastWrapperContainer variants={animateMovieContainer} initial='hidden' animate='show'>
            {cast?.map(cast => (
              <CastWrapper variants={animateCast} key={cast.id}>
                <CastImgWrapper>
                  <img src={`https://image.tmdb.org/t/p/w500/${cast?.profile_path}`} alt='' />
                </CastImgWrapper>
                <CastDetail>
                  <h4>{cast?.original_name}</h4>
                  <p>{cast?.character}</p>
                </CastDetail>
              </CastWrapper>
            ))}
          </CastWrapperContainer>
          <AddFavorites>
            <button onClick={addFavorite}>Add favorites</button>
          </AddFavorites>
          {showTrailer && (
            <TrailerContainer onClick={() => setShowTrailer(false)}>
              <iframe
                width='1100'
                height='600'
                src={`https://www.youtube.com/embed/${officialTRrailer.key}`}
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </TrailerContainer>
          )}
        </MovieDetailWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(m.div)`
  background-color: white;
  display: flex;
  background-color: ${props => props.theme.body};
  padding: 60px;
  gap: 5rem;
  max-width: 1400px;
  margin: auto;
  margin-top: 90px;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 20px;
    gap: 1rem;
  }
`;

const MovieImgWrapper = styled.div`
  flex: 1.5;
  padding: 0 1rem;
  align-self: flex-start;
  border-radius: 1rem;
  position: relative;
  width: 100%;

  img {
    border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 800px) {
    img {
      width: 100%;
    }
  }
`;

const MovieDetailWrapper = styled.div`
  flex: 3;
`;

const MovieTitle = styled(m.div)`
  text-align: center;

  h1 {
    font-size: 50px;
  }

  @media (max-width: 1200px) {
    h1 {
      font-size: 25px;
    }
    h2 {
      font-size: 16px;
    }
  }
`;

const CastWrapperContainer = styled(m.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 110px));
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
`;

const CastWrapper = styled(m.div)``;

const CastImgWrapper = styled.div`
  img {
    width: 100px;
    border-radius: 1rem;
  }
`;

const CastDetail = styled.div``;

const WatchTrailer = styled.div`
  button {
    border: none;
    background: #f9bc60;
    padding: 3px 30px;
    color: #fffffe;
    transition: all 0.5s;
    position: absolute;
    top: 50%;
    left: 25%;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    button {
      padding: 3px 20px;
      font-size: 1rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Overview = styled(m.div)`
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    font-size: 14px;

    h2 {
      font-size: 16px;
    }
  }
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  p {
    font-style: italic;
  }
`;

const TrailerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.5);

  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1200px) {
    iframe {
      width: 600px;
      height: 400px;
    }
  }

  @media (max-width: 600px) {
    iframe {
      width: 410px;
      height: 400px;
    }
  }

  @media (max-width: 400px) {
    iframe {
      width: 310px;
      height: 310px;
    }
  }
`;

const AddFavorites = styled(m.div)`
  margin-top: 2rem;
  button {
    border: none;
    padding: 6px 16px;
    background: #f9bc60;
    color: white;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #eca945;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    }
  }
`;
