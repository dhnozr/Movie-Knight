import { motion as m, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ShowItem = ({ show, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const controls = useAnimation();

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5 }, // Delay each item based on its index
    },
  };

  useEffect(() => {
    if (isInView) {
      const delay = Math.min(0.1 + (index % 10) * 0.1, 2);
      controls.start('show', { delay: delay });
    } else {
      controls.start('hidden');
    }
  }, [isInView]);

  return (
    <Wrapper onClick={() => console.log(show.id)} key={show?.id} ref={ref} variants={variants} animate={controls}>
      <Link to={`movie/${show.id}`}>
        <ImgWrapper>
          <img loading='lazy' src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`} alt='' />
        </ImgWrapper>
      </Link>
      <ShowTitle>
        <h3>{show?.title || show?.original_title}</h3>
      </ShowTitle>
    </Wrapper>
  );
};

const Wrapper = styled(m.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 10px;
  padding-bottom: 10px;
`;

const ImgWrapper = styled.div`
  img {
    /* height: 400px; */

    /* width: auto; */
    object-fit: cover;

    border-radius: 10px;
  }
`;

const ShowTitle = styled.div`
  text-align: center;
`;
