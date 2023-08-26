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

const deleteStore = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stores/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createStore = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stores.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const { name } = data;
      resolve({ firebaseKey: name, ...payload });
    })
    .catch(reject);
});

const updateStore = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stores/${payload.firebaseKey}.json`, {
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

export {
  getStores, getSingleStore, deleteStore, createStore, updateStore,
};
