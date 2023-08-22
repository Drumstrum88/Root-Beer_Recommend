import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

const getStores = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stores.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleStore = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stores${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getStores, getSingleStore };
