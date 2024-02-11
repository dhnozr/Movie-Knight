import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import { getLocalTheme } from './store/store';

function App() {
  return (
    <>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
