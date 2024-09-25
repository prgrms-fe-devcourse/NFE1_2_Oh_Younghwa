import { Link, Outlet } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <h1>LAYOUT</h1>
      <Link to="/asdf">wrongPage</Link>
      <Link to="/movie">movie</Link>
      <Link to="/">home</Link>

      <Outlet />
    </>
  );
}

export default App;
