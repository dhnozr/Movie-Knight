import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ShowItem } from './ShowItem';
import { animateMovieContainer } from './animation';
import { motion as m } from 'framer-motion';

export const Shows = ({ shows }) => {
  return (
    <>
      <Container variants={animateMovieContainer} initial='hidden' animate='show'>
        {shows?.map((show, index) => (
          <ShowItem key={show.id} show={show} index={index} />
        ))}
      </Container>
    </>
  );
};

const Container = styled(m.div)`
  display: grid;
  gap: 1rem;
  /* grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); */
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
