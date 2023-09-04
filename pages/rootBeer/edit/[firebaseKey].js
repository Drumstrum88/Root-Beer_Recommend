import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRootBeer } from '../../../components/API/rootBeerData';
import RootBeerForm from '../../../components/rootBeerForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditRootBeer() {
  const [editRootBeer, setEditRootBeer] = useState(null);
  const { user } = useAuth();
  const [content, setContent] = useState(null);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      getSingleRootBeer(firebaseKey)
        .then((data) => {
          console.warn('Root Beer Data:', data);
          console.warn('User UID:', user.uid);
          setEditRootBeer(data);
        })
        .catch((error) => {
          console.warn(error);
          setEditRootBeer(null);
        });
    }
  }, [firebaseKey, user.uid]);

  useEffect(() => {
    if (editRootBeer) {
      if (user && user.uid === editRootBeer.uid) {
        setContent(<RootBeerForm obj={editRootBeer} />);
      } else {
        alert('You do not have permission to edit this root beer');
      }
    }
  }, [editRootBeer, user]);

  return <div>{content}</div>;
}
