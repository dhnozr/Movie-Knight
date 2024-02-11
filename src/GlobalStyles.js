import styled, { createGlobalStyle } from 'styled-components';
import { useStore } from './store/store';

export const GlobalStyles = createGlobalStyle`

/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
}
/*
  Typographic tweaks!
  3. Add accessible line-height
  4. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Raleway', sans-serif;
  background: ${props => props.theme.body};
  color: ${props => props.theme.text};
  
  
  
}
/*
  5. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  6. Remove built-in form typography styles
*/
input, button, textarea, select,a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}
/*
  7. Avoid text overflows
*/
 h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  color: ${props => props.theme.headline}
}

p {
  overflow-wrap: break-word ;
}




/*
  8. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}




`;
