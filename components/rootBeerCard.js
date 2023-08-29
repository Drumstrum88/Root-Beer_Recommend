import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HeartIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';
import {
  addFavorite, deleteRootBeer, getUserRootBeers, removeFavorite,
} from './API/rootBeerData';
import { useAuth } from '../utils/context/authContext';

export default function RootBeerCard({ rootBeerObj, onUpdate, userFavorites }) {
  const [isFavorite, setIsFavorite] = useState(
    userFavorites.some((favorite) => favorite.rootBeerFirebaseKey === rootBeerObj.firebaseKey),
  );
  const { user } = useAuth();

  useEffect(() => {
    setIsFavorite(
      userFavorites.some((favorite) => favorite.rootBeerFirebaseKey === rootBeerObj.firebaseKey),
    );
  }, [userFavorites, rootBeerObj.firebaseKey]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(rootBeerObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(false);
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing favorite:', error);
        });
    } else {
      addFavorite(rootBeerObj.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(true);
          onUpdate();
        })
        .catch((error) => {
          console.error('Error adding favorite:', error);
        });
    }
  };
  const deleteThisRootBeer = () => {
    if (window.confirm(`Delete ${rootBeerObj.name}?`)) {
      deleteRootBeer(rootBeerObj.firebaseKey).then(() => getUserRootBeers);
    }
  };

  return (
    <Card style={{ width: '12rem', margin: '10px' }}>
      <Card.Img variant="top" src={rootBeerObj.image} alt={rootBeerObj.name} style={{ height: '225px' }} />
      <Card.Title>{rootBeerObj.name}</Card.Title>
      <Link href={`/rootBeer/${rootBeerObj.firebaseKey}`} passHref>
        <Button variant="primary" className="m-2">View</Button>
      </Link>
      <Link href={`/rootBeer/edit/${rootBeerObj.firebaseKey}`} passHref>
        <Button variant="info">Edit</Button>
      </Link>
      <Button
        variant={isFavorite ? 'danger' : 'primary'}
        onClick={toggleFavorite}
        className="m-2"
      >
        <HeartIcon
          className={isFavorite ? 'text-red-500' : 'text-blue-500'}
          h-6="false"
          w-6="true"
        />
      </Button>

      <Button
        variant="danger"
        onClick={deleteThisRootBeer}
        className="m-2"
      >
        Delete
      </Button>
    </Card>
  );
}

RootBeerCard.propTypes = {
  rootBeerObj: propTypes.shape({
    image: propTypes.string,
    name: propTypes.string,
    firebaseKey: propTypes.string,
  }).isRequired,
  userFavorites: propTypes.arrayOf(
    propTypes.shape({
      favoriteFirebaseKey: propTypes.string.isRequired,
      rootBeerFirebaseKey: propTypes.string.isRequired,
      uid: propTypes.string.isRequired,
    }),
  ),
  onUpdate: propTypes.func.isRequired,
};

RootBeerCard.defaultProps = {
  userFavorites: [],
};
