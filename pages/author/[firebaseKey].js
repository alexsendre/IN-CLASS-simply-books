/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  console.warn(authorDetails);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={authorDetails.image} alt="" style={{ width: '300px' }} />
        </div>
        <div className="ms-5 details">
          <h1 className="text-white">{authorDetails.first_name} {authorDetails.last_name}</h1>
          <h5>{authorDetails.email}</h5>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="text-center">
          <h3 className="text-white mt-5 text-center">Books</h3>
          <hr className="text-white mb-3" id="horizontal-auth" />
        </div>
        <div className="d-flex flex-wrap">
          {authorDetails.books?.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getDetails} />
          ))};
        </div>
      </div>
    </>
  );
}
