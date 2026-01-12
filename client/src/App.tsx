
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { GigsListPage } from './pages/gigs/GigsListPage';
import { GigDetailsPage } from './pages/gigs/GigDetailsPage';
import { PostGigPage } from './pages/gigs/PostGigPage';
import { MyGigsPage } from './pages/gigs/MyGigsPage';
import { MyBidsPage } from './pages/gigs/MyBidsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/gigs" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/gigs" element={<GigsListPage />} />
            <Route path="/gigs/:id" element={<GigDetailsPage />} />
            <Route
              path="/post-gig"
              element={
                <ProtectedRoute>
                  <PostGigPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-gigs"
              element={
                <ProtectedRoute>
                  <MyGigsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bids"
              element={
                <ProtectedRoute>
                  <MyBidsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
