import { deleteRootBeer, getSingleRootBeer } from './rootBeerData';
import { deleteStore, getSingleStore, getStoreRootBeers } from './storeData';

const viewRootBeerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleRootBeer(firebaseKey).then((rootObj) => {
    getSingleStore(rootObj.storeId).then((storeObj) => {
      resolve({ storeObj, ...rootObj });
    });
  }).catch((error) => reject(error));
});

const viewStoreDetails = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleStore(firebaseKey),
    getStoreRootBeers(firebaseKey)])
    .then(([storeObj, storeBeersArray]) => {
      resolve({ ...storeObj, beers: storeBeersArray });
    }).catch((error) => reject(error));
});

const deleteStoreRootBeers = (storeId) => new Promise((resolve, reject) => {
  getStoreRootBeers(storeId).then((beersArray) => {
    const deleteBeerPromise = beersArray.map((beer) => deleteRootBeer(beer.firebaseKey));

    Promise.all(deleteBeerPromise).then(() => {
      deleteStore(storeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewRootBeerDetails, viewStoreDetails, deleteStoreRootBeers };
