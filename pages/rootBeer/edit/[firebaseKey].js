import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRootBeer } from '../../../components/API/rootBeerData';
import RootBeerForm from '../../../components/rootBeerForm';

export default function EditRootBeer() {
  const [editRootBeer, setEditRootBeer] = useState(null);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      getSingleRootBeer(firebaseKey)
        .then((data) => setEditRootBeer(data))
        .catch((error) => {
          console.warn(error);
          setEditRootBeer(null);
        });
    }
  }, [firebaseKey]);

  return (
    <div>
      {editRootBeer && editRootBeer.firebaseKey ? (
        <RootBeerForm obj={editRootBeer} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
