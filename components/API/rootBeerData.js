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
  fetch(`${endpoint}/rootBeers/${payload.firebaseKey}.json`, {
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

const getStoreRootBeers = (storeFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const rootBeers = Object.values(data).filter((rootBeer) => rootBeer.storeFirebaseKey === storeFirebaseKey);
      resolve(rootBeers);
    })
    .catch(reject);
});

const getUserRootBeers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeers.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const userRootBeers = Object.values(data).filter((rootBeer) => rootBeer.uid === uid);
      resolve(userRootBeers);
    })
    .catch(reject);
});

const getUserFavorites = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const favoriteKeys = Object.keys(data);
        const userFavorites = favoriteKeys.map((key) => ({
          favoriteFirebaseKey: key,
          rootBeerFirebaseKey: data[key].rootBeerFirebaseKey,
          uid: data[key].uid,
        }));
        resolve(userFavorites);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const addFavorite = (rootBeerFirebaseKey, uid) => new Promise((resolve, reject) => {
  const favorite = {
    rootBeerFirebaseKey,
    uid,
    favorites: true,
  };

  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorite),
  })
    .then((response) => response.json())
    .then(({ name }) => {
      const patchedFavorite = { ...favorite, firebaseKey: name };
      resolve(patchedFavorite);
    })
    .catch(reject);
});

const removeFavorite = (rootBeerFirebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteKey = Object.keys(data).find(
        (key) => data[key].rootBeerFirebaseKey === rootBeerFirebaseKey,
      );

      if (favoriteKey) {
        fetch(`${endpoint}/userFavorites/${uid}/${favoriteKey}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((deleteResponse) => {
            if (deleteResponse.ok) {
              resolve();
            } else {
              reject(new Error('Failed to remove favorite'));
            }
          })
          .catch(reject);
      } else {
        reject(new Error('Favorite not found'));
      }
    })
    .catch(reject);
});

const getCommunityFavorites = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userFavorites.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeerComments.json`, {
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

const editComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeerComments/${payload.firebaseKey}.json`, {
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

const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeerComments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getComments = (rootBeerFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/rootBeerComments.json?orderBy="rootBeerFirebaseKey"&equalTo="${rootBeerFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && typeof data === 'object') {
        const comments = Object.values(data);
        resolve(comments);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getCommunityRootBeers, createRootBeer, editRootBeer, deleteRootBeer, getSingleRootBeer, getStoreRootBeers, getUserRootBeers, getUserFavorites, addFavorite, removeFavorite, getCommunityFavorites, createComment, editComment, deleteComment, getComments,
};
