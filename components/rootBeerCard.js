/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import propTypes from 'prop-types';
import {
  Eyeglasses, Pencil, Star, StarFill, Trash,
} from 'react-bootstrap-icons';
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
    // eslint-disable-next-line react/prop-types
    if (user.uid === rootBeerObj.uid) { // Check if the current user's UID matches the UID of the root beer
      if (window.confirm(`Delete ${rootBeerObj.name}?`)) {
        deleteRootBeer(rootBeerObj.firebaseKey)
          .then(() => getUserRootBeers)
          .catch((error) => {
            console.error('Error deleting root beer:', error);
          });
      }
    } else {
      alert('You do not have permission to delete this root beer.');
    }
  };

  return (
    <Card
      className="card"
      style={{
        width: '12rem', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <Card.Img variant="top" src={rootBeerObj.image} alt={rootBeerObj.name} style={{ height: '225px' }} />
      <button
        type="button"
        className="btn btn-link"
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <StarFill className="text-red-500" size={24} />
        ) : (
          <Star className="text-blue-500" size={24} />
        )}
      </button>
      <Card.Title>{rootBeerObj.name}</Card.Title>
      <div className="button-container">
        <Link href={`/rootBeer/${rootBeerObj.firebaseKey}`} passHref>
          <Eyeglasses type="button" className="m-2" id="viewBtn">View</Eyeglasses>
        </Link>
        <Pencil
          type="button"
          id="editBtn"
          onClick={() => {
            // eslint-disable-next-line react/prop-types
            if (user.uid === rootBeerObj.uid) {
              window.location.href = `/rootBeer/edit/${rootBeerObj.firebaseKey}`;
            } else {
              alert('You do not have permission to edit this Root Beer');
            }
          }}
        />

        <Trash
          type="button"
          onClick={deleteThisRootBeer}
          className="m-2"
        >
          Delete
        </Trash>
      </div>
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
