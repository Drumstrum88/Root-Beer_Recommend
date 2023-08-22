/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
        <img src={rootBeerDetails.image} alt={rootBeerDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {rootBeerDetails.name} at : {rootBeerDetails.storeObject?.name}
        </h5>
        Root Beer Description: {rootBeerDetails.description}
        <hr />
      </div>
      <Link href={`/rootBeer/edit/${rootBeerDetails.firebaseKey}`} passHref>
        <Button>Edit Details</Button>
      </Link>
    </div>
  );
}
