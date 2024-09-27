import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SessionProvider } from './context/SessionProvider.tsx';
import LoginPage from './pages/LoginPage/components/LoginForm.tsx';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage.tsx';
import MoviePage from './pages/MoviePage/MoviePage.tsx';
import SignUpPage from './pages/SignUpPage/components/SignUpForm.tsx';
import SearchPage from './pages/SearchPage/SearchPage.tsx';
import TimelinePage from './pages/TimelinePage/TimelinePage.tsx';
import { store } from './shared/store/store.ts';
import Layout from './Layout.tsx';
import './reset.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SessionProvider>
        <Layout />
      </SessionProvider>
    ),
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/movie',
        element: <MoviePage />,
        errorElement: <div>404 Not Found</div>,
      },

    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <div>404 Not Found</div>,
  },
  { path: '/signup', element: <SignUpPage />, errorElement: <div>404 Not Found</div> }, {
    path: '/search',
    element: <SearchPage/>,
    errorElement: <div>404 Not Found</div>,
  },
  { path: '/signup', element: <SignUpPage />, errorElement: <div>404 Not Found</div> },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
