import { Link, Outlet } from 'react-router-dom';

import PopularMovies from './pages/MoviePage/components/PopularMovies';

import './App.css';

function App() {
  return (
    <>
      <h1>LAYOUT</h1>
      <Link to="/asdf">wrongPage</Link>
      <Link to="/movie">movie</Link>
      <Link to="/">home</Link>
      <PopularMovies />
      <Outlet />
    </>
  );
}

export default App;
