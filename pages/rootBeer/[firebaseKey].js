import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import viewRootBeerDetails from '../../components/API/mergedData';

export default function ViewRootBeer() {
  const [rootBeerDetails, setRootBeerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewRootBeerDetails(firebaseKey).then(setRootBeerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={rootBeerDetails.image} alt={rootBeerDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {rootBeerDetails.name} at {rootBeerDetails.storeId}
        </h5>
        Root Beer Description {rootBeerDetails.details}
        <hr />
      </div>
    </div>
  );
}
