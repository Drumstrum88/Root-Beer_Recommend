export default function rankRootBeers(rootBeers, userFavorites) {
  const rootBeerCounts = {};

  // Convert userFavorites object into an array of favorite objects
  const allFavorites = [];
  Object.keys(userFavorites).forEach((userKey) => {
    const userFavoritesObj = userFavorites[userKey];
    Object.keys(userFavoritesObj).forEach((favoriteKey) => {
      allFavorites.push(userFavoritesObj[favoriteKey]);
    });
  });

  // Iterate through allFavorites and count the occurrences of each rootBeerFirebaseKey
  allFavorites.forEach((favorite) => {
    const { rootBeerFirebaseKey } = favorite;
    rootBeerCounts[rootBeerFirebaseKey] = (rootBeerCounts[rootBeerFirebaseKey] || 0) + 1;
  });

  // Map root beers to include a favoriteCount property based on the counts
  const rankedRootBeers = rootBeers.map((rootBeer) => ({
    ...rootBeer,
    favoriteCount: rootBeerCounts[rootBeer.firebaseKey] || 0,
  }));

  // Sort the root beers by favoriteCount in descending order
  rankedRootBeers.sort((a, b) => b.favoriteCount - a.favoriteCount);

  return rankedRootBeers;
}
