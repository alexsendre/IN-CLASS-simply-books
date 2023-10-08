/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center my-4">
      <h1 className="mt-5 text-white">Welcome, {user.displayName}</h1>
    </div>
  );
}

export default Home;
