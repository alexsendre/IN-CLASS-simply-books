/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center my-4">
      <h1 className="mt-5 text-white">Welcome, {user.displayName}!</h1>
      <div className="mt-3 d-flex justify-content-center" style={{ gap: '10px' }}>
        <Link passHref href="/book/view">
          <Button type="button" className="btn-warning">View Books</Button>
        </Link>
        <Link passHref href="/author/view">
          <Button type="button" className="btn-warning">View Authors</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
