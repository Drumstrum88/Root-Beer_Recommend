import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserFavorites } from '../../components/API/rootBeerData';
import RootBeerCard from '../../components/rootBeerCard';

export default function UserFavorites() {
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      getUserFavorites(user.uid)
        .then((favorites) => {
          setUserFavorites(favorites);
        })
        .catch((error) => {
          console.error('Error fetching user favorites:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <h1>User Favorites:</h1>
      <div>
        {userFavorites.map((rootBeer) => (
          <RootBeerCard
            key={rootBeer.rootBeerFirebaseKey}
            rootBeerObj={rootBeer}
            userFavorites={userFavorites}
            onUpdate={() => getUserFavorites(user.uid).then((favorites) => setUserFavorites(favorites))}
          />
        ))}
      </div>
    </div>
  );
}
