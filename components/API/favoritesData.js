import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

const addFavorite = (rootBeerFirebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/favorites.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rootBeerFirebaseKey, uid }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { name } = data;
      resolve({ firebaseKey: name, rootBeerFirebaseKey, uid });
    })
    .catch(reject);
});

const updateFavorite = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/favorites/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserFavorites = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/favorites.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userFavorites = Object.values(data).filter((favorite) => favorite.uid === uid);
      resolve(userFavorites);
    })
    .catch(reject);
});

const removeFavorite = (rootBeerFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/favorites/${rootBeerFirebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  addFavorite, getUserFavorites, removeFavorite, updateFavorite,
};
