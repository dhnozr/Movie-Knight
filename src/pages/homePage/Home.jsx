import React, { useEffect, useState } from 'react';
import { pageAnimation } from '../../components/animation';
import { motion as m, useAnimation, useInView } from 'framer-motion';
import styled from 'styled-components';
import { useGetUser, useMovieGenres, useMovies, useTvShows } from '../../components/request';
import { useStore } from '../../store/store';
import { Shows } from '../../components/Shows';

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import { Navigation, Pagination, EffectCoverflow, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

export const Home = () => {
  const [activeMovie, setActiveMovie] = useState(null);
  const currentPage = useStore(state => state.currentMoviePage);

  const incrementCurrentMoviePage = useStore(state => state.incrementCurrentMoviePage);
  const decrementCurrentMoviePage = useStore(state => state.decrementCurrentMoviePage);

  const {} = useMovies(currentPage);
  const movies = useStore(state => state.movies);

  const { isLoading: tvIsLoading, error: tvError } = useTvShows();
  const tvShows = useStore(state => state.tvShows);

  // navbarda tv showları gostere tıklayınca burası true olacak ve tv showları maplayacam
  const showTvShows = useStore(state => state.showTvShows);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const searchedMovies = useStore(state => state.fetchedMovies);

  return (
    <Wrapper variants={pageAnimation} initial='hidden' animate='show' exit='exit'>
      <SwiperContainer>
        <ActiveMovieWrapper>
          {activeMovie && (
            <ActiveMovie>
              <img src={`https://image.tmdb.org/t/p/original/${activeMovie.poster_path}`} alt='' />
            </ActiveMovie>
          )}
        </ActiveMovieWrapper>
        {movies.length > 0 && (
          <Swiper
            effect='coverflow'
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
            }}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 640px
              700: {
                slidesPerView: 2,
                spaceBetween: 70,
              },
              // when window width is >= 1024px
              1224: {
                slidesPerView: 3,
                spaceBetween: 100,
              },
            }}
            onSlideChange={swiper => {
              const currentIndex = swiper.realIndex;
              setActiveMovie(movies[currentIndex]);
            }}
            modules={[EffectCoverflow, Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          >
            {movies?.map(movie => (
              <SwiperSlide key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <ShowsWrapper>
          {searchedMovies ? <Shows shows={searchedMovies} /> : <Shows shows={showTvShows ? tvShows : movies} />}
        </ShowsWrapper>

        <ButtonWrapper>
          <button disabled={currentPage <= 1} onClick={decrementCurrentMoviePage}>
            Prev Page
          </button>
          <button onClick={incrementCurrentMoviePage}>Next page</button>
        </ButtonWrapper>
      </SwiperContainer>
    </Wrapper>
  );
};

const Wrapper = styled(m.div)``;

const SwiperContainer = styled.div`
  padding-top: 90px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  .swiper {
    height: 700px;

    .swiper-slide {
      height: fit-content;
      img {
        height: 600px;
        width: 100%;
        object-fit: cover;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
      }
    }
  }

  @media (max-width: 1200px) {
    .swiper {
      height: 80svh;

      .swiper-slide {
        height: 100%;
        img {
          object-fit: cover;
          height: 100%;
        }
      }
    }
  }
`;

const ActiveMovieWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 700px;
  overflow: hidden;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ActiveMovie = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 4/4;
  }
`;

const ShowsWrapper = styled(m.div)`
  /*  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 250px));
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem; */
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  button {
    padding: 6px 12px;
    border: none;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    cursor: pointer;
  }
`;
