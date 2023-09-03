import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleStore } from '../../../components/API/storeData';
import StoreForm from '../../../components/storeForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditStore() {
  const [editStore, setEditStore] = useState({});
  const router = useRouter();
  const [content, setContent] = useState(null);
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleStore(firebaseKey).then(setEditStore);
  }, [firebaseKey]);

  useEffect(() => {
    if (editStore) {
      if (user && user.uid === editStore.uid) {
        setContent(<StoreForm obj={editStore} />);
      } else {
        alert('You do not have permission to edit this store');
      }
    } else {
      setContent(<p>Loading...</p>);
    }
  }, [editStore, user]);

  return <div>{content}</div>;
}
