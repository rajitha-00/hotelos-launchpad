import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth, LoginPage, useAuth } from './features/auth';
import { LaunchpadContainer } from './containers';
import { UnauthorizedPage, NotFoundPage } from './components';
import { PostLoginRipple } from './components/PostLoginRipple/PostLoginRipple';

const PostLoginRippleHost = () => {
  const { postLoginRippleRequested, dismissPostLoginRipple } = useAuth();
  return (
    <PostLoginRipple
      active={postLoginRippleRequested}
      onComplete={dismissPostLoginRipple}
    />
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostLoginRippleHost />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <LaunchpadContainer />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
