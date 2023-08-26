import { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import RootBeerCard from '../../components/rootBeerCard';
import { getUserRootBeers } from '../../components/API/rootBeerData';

export default function User() {
  const { user } = useAuth();
  const [lastSignInTime, setLastSignInTime] = useState('');
  const [userRootBeers, setUserRootBeers] = useState([]);

  useEffect(() => {
    if (user && user.metadata && user.metadata.lastSignInTime) {
      setLastSignInTime(user.metadata.lastSignInTime);
    }

    if (user && user.uid) {
      getUserRootBeers(user.uid)
        .then((rootBeers) => {
          setUserRootBeers(rootBeers);
        })
        .catch((error) => {
          console.error('Error fetching user root beers:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Last Sign-In Time: {lastSignInTime}</p>
      <h2>Your Recommended Root Beers</h2>
      <div>
        {userRootBeers.map((rootBeer) => (
          <RootBeerCard
            key={rootBeer.firebaseKey}
            rootBeerObj={rootBeer}
            onUpdate={getUserRootBeers()}
          />
        ))}
      </div>
    </div>
  );
}
