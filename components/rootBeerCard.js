import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import propTypes from 'prop-types'; // Import propTypes from 'prop-types'
import { deleteRootBeer } from './API/rootBeerData';
import { addFavorite, removeFavorite, updateFavorite } from './API/favoritesData';
import { useAuth } from '../utils/context/authContext';

export default function RootBeerCard({ rootBeerObj, onUpdate, userFavorites }) {
  const [isFavorite, setIsFavorite] = useState(
    userFavorites.some((favorite) => favorite.rootBeerFirebaseKey === rootBeerObj.firebaseKey),
  );
  const { user } = useAuth();

  const toggleFavorite = () => {
    if (isFavorite) {
      // Remove from favorites
      const favoriteToRemove = userFavorites.find(
        (favorite) => favorite.rootBeerFirebaseKey === rootBeerObj.firebaseKey,
      );
      removeFavorite(favoriteToRemove.firebaseKey, user.uid)
        .then(() => {
          setIsFavorite(false);
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing favorite:', error);
        });
    } else {
      // Add to favorites
      addFavorite(rootBeerObj.firebaseKey, user.uid)
        .then((newFavoriteKey) => {
          setIsFavorite(true);
          onUpdate();
          updateFavorite(newFavoriteKey, { firebaseKey: newFavoriteKey });
        })
        .catch((error) => {
          console.error('Error adding favorite:', error);
        });
    }
  };
  const deleteThisRootBeer = () => {
    if (window.confirm(`Delete ${rootBeerObj.name}?`)) {
      deleteRootBeer(rootBeerObj.firebaseKey).then(() => onUpdate());
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
        {isFavorite ? 'Remove Favorite' : 'Favorite'}
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
      favoriteFirebaseKey: propTypes.string.isRequired, // Fix the prop name here
      rootBeerFirebaseKey: propTypes.string.isRequired,
      uid: propTypes.string.isRequired,
    }),
  ),
  onUpdate: propTypes.func.isRequired,
};

RootBeerCard.defaultProps = {
  userFavorites: [],
};
