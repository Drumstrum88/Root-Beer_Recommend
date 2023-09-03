/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import Signin from '../components/Signin';
import { getCommunityRootBeers, getUserFavorites } from '../components/API/rootBeerData';
import RootBeerCard from '../components/rootBeerCard';
import SearchBar from '../components/search';

function Home() {
  const [rootBeer, setRootBeer] = useState([]);
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState([]);
  const [, setSearchQuery] = useState('');
  const [fullRootBeerData, setFullRootBeerData] = useState([]); // Store the complete dataset

  const getAllRootBeers = () => {
    getCommunityRootBeers().then((data) => {
      setRootBeer(data);
      setFullRootBeerData(data); // Update the complete dataset
    });
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

  const handleSearch = (query) => {
    const filteredRootBeers = fullRootBeerData.filter((beer) => beer.name.toLowerCase().includes(query.toLowerCase()) || beer.storeId.toLowerCase().includes(query.toLowerCase()));

    setRootBeer(filteredRootBeers);
    setSearchQuery('');
  };

  return (
    <div className="text-center my-4">
      {user ? (
        <>
          <div className="indexHead">Community Root Beers</div>
          <SearchBar className="search-bar" onSearch={handleSearch} />
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
