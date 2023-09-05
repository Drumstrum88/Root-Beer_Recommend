import { useEffect, useState } from 'react';
import { deleteStore, getStores } from '../../components/API/storeData';
import { useAuth } from '../../utils/context/authContext';
import StoreCard from '../../components/storeCard';

function AllStores() {
  const [stores, setStores] = useState([]);
  const { user } = useAuth();

  const getAllStores = () => {
    getStores().then(setStores);
  };

  const handleDeleteStore = (storeKey) => {
    deleteStore(storeKey).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getAllStores();
  }, []);

  if (user) {
    return (
      <div className="text-center my-4">
        <div className="stores">Community Stores</div>
        <div className="d-flex flex-wrap">
          {stores.map((store) => (
            <StoreCard
              key={store.firebaseKey}
              storeObj={store}
              onUpdate={getAllStores}
              onDelete={() => handleDeleteStore(store.firebaseKey)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllStores;
