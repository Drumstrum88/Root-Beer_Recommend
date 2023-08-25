import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewStoreDetails } from '../../components/API/mergedData';
import Loading from '../../components/Loading';
import RootBeerCard from '../../components/rootBeerCard';

export default function StoreDetails() {
  const [storeData, setStoreData] = useState(null);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewStoreDetails(firebaseKey)
        .then((data) => setStoreData(data))
        .catch((error) => {
          console.warn(error);
          setStoreData(null);
        });
    }
  }, [firebaseKey]);

  if (!storeData) {
    return <Loading />;
  }

  const { name, rootBeers } = storeData;

  return (
    <div>
      <h1>Store Details</h1>
      <h2>{name}</h2>
      <h3>Root Beers at this location:</h3>
      {Array.isArray(rootBeers) && rootBeers.length > 0 ? (
        rootBeers.map((rootBeer) => (
          <RootBeerCard key={rootBeer.firebaseKey} rootBeerObj={rootBeer} />
        ))
      ) : (
        <p>No Root Beers At This Location</p>
      )}
    </div>
  );
}
