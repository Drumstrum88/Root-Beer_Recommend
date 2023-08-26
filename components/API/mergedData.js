import { deleteRootBeer, getSingleRootBeer, getStoreRootBeers } from './rootBeerData';
import { deleteStore, getSingleStore } from './storeData';

const viewRootBeerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleRootBeer(firebaseKey).then((rootObj) => {
    getSingleStore(rootObj.storeFirebaseKey).then((storeObj) => {
      resolve({ storeObj, ...rootObj });
    });
  }).catch((error) => reject(error));
});

const viewStoreDetails = (storeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleStore(storeFirebaseKey) // Assuming you have a function like this
    .then((storeObj) => {
      getStoreRootBeers(storeFirebaseKey) // Assuming you have a function like this
        .then((storeBeersArray) => {
          resolve({ ...storeObj, rootBeers: storeBeersArray });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

const deleteStoreRootBeers = (storeFirebaseKey) => new Promise((resolve, reject) => {
  getStoreRootBeers(storeFirebaseKey).then((beersArray) => {
    const deleteBeerPromise = beersArray.map((beer) => deleteRootBeer(beer.firebaseKey));

    Promise.all(deleteBeerPromise).then(() => {
      deleteStore(storeFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewRootBeerDetails, viewStoreDetails, deleteStoreRootBeers };
