import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import Signin from '../components/Signin'; // TODO: COMMENT IN FOR AUTH
import { getCommunityRootBeers } from '../components/API/rootBeerData';
import RootBeerCard from '../components/rootBeerCard';

function Home() {
  const [rootBeer, setRootBeer] = useState([]);
  const { user } = useAuth();

  const getAllRootBeers = () => {
    getCommunityRootBeers().then(setRootBeer);
  };

  useEffect(() => {
    getAllRootBeers();
  }, []);

  if (user) {
    return (
      <div className="text-center my-4">
        <Link href="/rootBeer/new" passHref>
          <Button>Recommend A Root Beer!</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {rootBeer.map((beer) => (
            <RootBeerCard key={beer.firebaseKey} rootBeerObj={beer} onUpdate={getAllRootBeers} />
          ))}
        </div>

      </div>
    );
  }
    <Signin />;
}

export default Home;
