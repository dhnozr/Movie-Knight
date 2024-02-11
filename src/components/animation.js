export const pageAnimation = {
  hidden: {
    opacity: 0,
    y: 600,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },

  exit: {
    opacity: 0,
    y: 600,
    transition: { duration: 1 },
  },
};

// asidebar menüsü

export const menuSlide = {
  hidden: {
    x: 'calc(100% + 99px)',
  },

  show: {
    x: '0%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },

  exit: {
    x: '100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// slide container yapıcam sadece ul listinin containeri olsun böylece stagger effecti verebilirim

export const slideContainer = {
  hidden: {
    opacity: '0',
  },

  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: 'beforeChildren' },
  },

  exit: {
    transition: { staggerChildren: 0.1, when: 'beforeChildren' },
  },
};

// mapladigim nav linkleri

export const slide = {
  hidden: {
    x: '150%',
  },

  show: {
    x: '0%',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },

  exit: {
    x: '120%',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

// movileri gösterirken animasyon ekleyecegim

export const animateMovies = {
  hidden: {
    opacity: 0,
    y: 300,
    transition: { duration: 1 },
  },

  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

export const animateCast = {
  hidden: {
    opacity: 0,
    y: 200,
    transition: { duration: 1 },
  },

  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

// movie container yaptım stagger efecti vericem
export const animateMovieContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      // Stagger the animations of children by 0.1 seconds
    },
  },
};
