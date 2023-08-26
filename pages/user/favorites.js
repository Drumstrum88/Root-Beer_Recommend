import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import RootBeerCard from '../../components/rootBeerCard';
import { getSingleRootBeer } from '../../components/API/rootBeerData';
import { getUserFavorites } from '../../components/API/favoritesData';

export default function UserFavorites() {
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  // Function to fetch user favorites
  const getTheUserFavorites = () => {
    if (user && user.uid) {
      getUserFavorites(user.uid)
        .then(async (favorites) => {
          const favoriteRootBeers = await Promise.all(
            favorites.map(async (favorite) => {
              const rootBeer = await getSingleRootBeer(favorite.rootBeerFirebaseKey);
              return { ...rootBeer, favoriteID: favorite.firebaseKey };
            }),
          );
          setUserFavorites(favoriteRootBeers);
        })
        .catch((error) => {
          console.error('Error fetching user favorites', error);
        });
    }
  };

  useEffect(() => {
    getTheUserFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onUpdate={() => { getUserFavorites(); }}
          />
        ))}
      </div>
    </div>
  );
}
