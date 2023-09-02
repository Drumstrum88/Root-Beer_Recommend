import React, { useEffect, useState } from 'react';
import { getCommunityFavorites, getCommunityRootBeers } from '../components/API/rootBeerData';
import rankRootBeers from '../components/rankFavorites';

export default function RankedCommunityFavorites() {
  const [communityFavorites, setCommunityFavorites] = useState([]);
  const [rootBeers, setRootBeers] = useState([]);

  useEffect(() => {
    getCommunityFavorites()
      .then((favorites) => {
        setCommunityFavorites(favorites);
      })
      .catch((error) => {
        console.error('Error fetching community favorites:', error);
      });

    // Fetch all community root beers
    getCommunityRootBeers()
      .then((rootBeersData) => {
        setRootBeers(rootBeersData);
      })
      .catch((error) => {
        console.error('Error fetching community root beers:', error);
      });
  }, []);

  // Rank the root beers based on community favorites
  const rankedRootBeers = rankRootBeers(rootBeers, communityFavorites);

  return (
    <div>
      <div className="communityFavorites">Root Beer Ranker</div>
      <div className="center-container">
        <table style={{
          border: '1px solid lightgrey',
        }}
        >
          <thead className="rankTable">
            <tr
              style={{
                border: '1px solid lightgrey',
              }}
            >
              <th>Root Beer Name</th>
              <th>Favorite Count</th>
            </tr>
          </thead>
          <tbody>
            {rankedRootBeers
              .filter((rootBeer) => rootBeer.favoriteCount > 0) // Filter out root beers with 0 favorites
              .map((rootBeer) => (
                <tr
                  key={rootBeer.firebaseKey}
                  style={{
                    border: '1px solid lightgrey',
                  }}
                >
                  <td>{rootBeer.name}</td>
                  <td className="favorite-count">{rootBeer.favoriteCount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
