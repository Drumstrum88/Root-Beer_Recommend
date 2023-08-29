/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import Signin from '../components/Signin';
import { getCommunityRootBeers, getUserFavorites } from '../components/API/rootBeerData';
import RootBeerCard from '../components/rootBeerCard';

function Home() {
  const [rootBeer, setRootBeer] = useState([]);
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);

  const getAllRootBeers = () => {
    getCommunityRootBeers().then(setRootBeer);
  };

  const getTheUserFavorites = () => {
    if (user) {
      getUserFavorites(user.uid).then(setUserFavorites);
    }
  };

  useEffect(() => {
    getAllRootBeers();
    if (user) {
      getTheUserFavorites();
    }
  }, [user]);

  const rootBeersWithFavorites = rootBeer.map((beer) => ({
    ...beer,
    isFavorite: userFavorites.some((favorite) => favorite.rootBeerFirebaseKey === beer.firebaseKey),
  }));

  return (
    <div className="text-center my-4">
      {user ? (
        <>
          <Link href="/rootBeer/new" passHref>
            <Button>Recommend A Root Beer!</Button>
          </Link>
          <div className="d-flex flex-wrap">
            {rootBeersWithFavorites.map((beer) => (
              <RootBeerCard
                key={beer.firebaseKey}
                rootBeerObj={beer}
                userFavorites={userFavorites}
                onUpdate={getAllRootBeers}
              />
            ))}
          </div>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
}

export default Home;
