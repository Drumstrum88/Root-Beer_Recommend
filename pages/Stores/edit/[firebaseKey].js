import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleStore } from '../../../components/API/storeData';
import StoreForm from '../../../components/storeForm';

export default function EditStore() {
  const [editStore, setEditStore] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleStore(firebaseKey).then(setEditStore);
  }, [firebaseKey]);

  return (
    <div>
      {editStore.firebaseKey ? (
        <StoreForm obj={editStore} />
      ) : (
        <p>Loading...</p>

      )}
    </div>
  );
}
