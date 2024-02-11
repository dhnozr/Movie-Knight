import { create } from 'zustand';

export const useStore = create((set, get) => ({
  burgerIsActive: false,
  toggleBurger: () => set(state => ({ burgerIsActive: !state.burgerIsActive })),
  isDarkThemeActive: false, // Initial state
  toggleDarkTheme: () => {
    const nextState = !get().isDarkThemeActive;
    set({ isDarkThemeActive: nextState });
    localStorage.setItem('isDarkThemeActive', JSON.stringify(nextState)); // Save to localStorage
  },
  // fetchledigim movieleri ve tv showları yollayacam
  movies: [],
  currentMoviePage: 1,
  incrementCurrentMoviePage: () => set(state => ({ currentMoviePage: state.currentMoviePage + 1 })),
  // Optionally, you can create a function to decrement the current page
  decrementCurrentMoviePage: () => set(state => ({ currentMoviePage: state.currentMoviePage - 1 })),
  setMovies: movies => set({ movies }),
  tvShows: [],
  setTvShows: tvShows => set({ tvShows }),
  fetchedMovies: [],
  setFetchedMovies: fetchedMovies => set({ fetchedMovies }),

  // navbarda tvshows butonu olusturdum burada state tutup ona göre tv ya da movieleri homepageda gösterecegim
  showTvShows: false,
  toggleShowTvShows: () => set(state => ({ showTvShows: !state.showTvShows })),

  // subabase icin store

  user: null,
  setUser: user => set({ user }),
  clearUser: () => set(() => ({ user: null })),
}));

// Function to load the theme preference from localStorage
export function getLocalTheme() {
  const isDarkThemeActive = JSON.parse(localStorage.getItem('isDarkThemeActive'));
  if (isDarkThemeActive !== null) {
    useStore.setState({ isDarkThemeActive });
  }
}
