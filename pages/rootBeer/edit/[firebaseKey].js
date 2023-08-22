import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleRootBeer } from '../../../components/API/rootBeerData';
import RootBeerForm from '../../../components/rootBeerForm';

export default function EditRootBeer() {
  const [editRootBeer, setEditRootBeer] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRootBeer(firebaseKey).then(setEditRootBeer);
  }, [firebaseKey]);

  return (
    <div>
      {editRootBeer.firebaseKey ? (
        <RootBeerForm obj={editRootBeer} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
