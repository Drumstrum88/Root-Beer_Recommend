import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getCommunityRootBeers, getUserFavorites } from '../../components/API/rootBeerData';
import RootBeerCard from '../../components/rootBeerCard';

export default function UserFavorites() {
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);
  const [rootBeers, setRootBeers] = useState([]);

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

  useEffect(() => {
    getCommunityRootBeers().then((rootBeersData) => {
      setRootBeers(rootBeersData);
    })
      .catch((error) => {
        console.error('Error fetching root beers:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Favorites:</h1>
      <div>
        {userFavorites.map((favorite) => {
          const matchingRootBeer = rootBeers.find((rootBeer) => rootBeer.firebaseKey === favorite.rootBeerFirebaseKey);
          if (matchingRootBeer) {
            return (
              <RootBeerCard
                key={matchingRootBeer.firebaseKey}
                rootBeerObj={matchingRootBeer}
                userFavorites={userFavorites}
                onUpdate={() => getUserFavorites(user.uid).then((favorites) => setUserFavorites(favorites))}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
