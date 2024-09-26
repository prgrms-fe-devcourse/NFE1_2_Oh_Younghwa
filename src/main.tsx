import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SessionProvider } from './context/SessionProvider.tsx';
import LoginPage from './pages/LoginPage/components/LoginForm.tsx';
import MoviePage from './pages/MoviePage/MoviePage.tsx';
import SignUpPage from './pages/SignUpPage/components/SignUpForm.tsx';
import { store } from './shared/store/store.ts';
import Layout from './Layout.tsx';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage.tsx';

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
      { path: '/movie/:movieId', element: <MovieDetailPage />, errorElement: <div>404 Not Found</div> },
      {
        path: '/login',
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
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
