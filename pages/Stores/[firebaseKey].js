import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewStoreDetails } from '../../components/API/mergedData';
import Loading from '../../components/Loading';
import RootBeerCard from '../../components/rootBeerCard';

export default function StoreDetails() {
  const [storeData, setStoreData] = useState(null);
  const [rootBeers, setRootBeers] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      viewStoreDetails(firebaseKey)
        .then((data) => {
          setStoreData(data);
          setRootBeers(data.rootBeers);
        })
        .catch((error) => {
          console.warn(error);
          setStoreData(null);
        });
    }
  }, [firebaseKey]);

  if (!storeData) {
    return <Loading />;
  }

  return (
    <div>
      <h2>{storeData.name}</h2>
      {Array.isArray(rootBeers) && rootBeers.length > 0 ? (
        <>
          <div className="stores">{rootBeers[0].storeId}</div>
          <div className="rootBeerContainer">
            {rootBeers.map((rootBeer) => (
              <RootBeerCard key={rootBeer.firebaseKey} rootBeerObj={rootBeer} />
            ))}
          </div>
        </>
      ) : (
        <p>No Root Beers At This Location</p>
      )}
    </div>
  );
}
