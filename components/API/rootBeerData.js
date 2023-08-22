import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCommunityRootBeers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createRootBeer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const editRootBeer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers/${payload.firebaseKey}.json`, { // Specify the unique key for the resource
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(() => resolve(payload))
    .catch(reject);
});

const deleteRootBeer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleRootBeer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCommunityRootBeers, createRootBeer, editRootBeer, deleteRootBeer, getSingleRootBeer,
};
