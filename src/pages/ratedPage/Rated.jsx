import React, { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { pageAnimation } from '../../components/animation';
import styled from 'styled-components';
import { useStore } from '../../store/store';
import { useGetUser } from '../../components/request';
import { supabase } from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Rated = () => {
  const navigate = useNavigate();
  const {} = useGetUser();
  const user = useStore(state => state.user);
  if (!user) {
    navigate('/');
  }

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const { data, error } = await supabase.from('favoriteMovies').select('*').eq('user_id', user?.id);

      if (error) {
        return [];
      }

      if (!user) {
        return [];
      } else {
        setFavoriteMovies(data);
      }

      return data;
    };

    fetchFavoriteMovies();
  }, []);

  return (
    <Wrapper variants={pageAnimation} initial='hidden' animate='show' exit='exit'>
      <div>
        <h2>My Favorite Movies</h2>
        {favoriteMovies.length === 0 ? (
          <p>You have no favorite movies.</p>
        ) : (
          <FavoriteMovies>
            {favoriteMovies.map(movie => (
              <div key={movie.movie_id}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.movie_poster_path}`} alt={movie.movie_title} />
                <h3>{movie.movie_title}</h3>
                {/* Add any other movie details you want to display here */}
              </div>
            ))}
          </FavoriteMovies>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(m.div)`
  margin-top: 120px;
  padding: 1rem;
`;

const FavoriteMovies = styled(m.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 350px));
  gap: 1rem;
  text-align: center;
  img {
    border-radius: 1rem;
  }
`;
