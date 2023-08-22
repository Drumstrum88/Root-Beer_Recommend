import { getSingleRootBeer } from './rootBeerData';
import { getSingleStore } from './storeData';

const viewRootBeerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleRootBeer(firebaseKey).then((rootObj) => {
    getSingleStore(rootObj.storeId).then((storeObj) => {
      resolve({ storeObj, ...rootObj });
    });
  }).catch((error) => reject(error));
});

export default viewRootBeerDetails;
