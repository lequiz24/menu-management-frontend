import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
