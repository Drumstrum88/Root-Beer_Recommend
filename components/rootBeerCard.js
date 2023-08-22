import React from 'react';
import propTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteRootBeer } from './API/rootBeerData';

export default function RootBeerCard({ rootBeerObj, onUpdate }) {
  const deleteThisRootBeer = () => {
    if (window.confirm(`Delete ${rootBeerObj.name}?`)) {
      deleteRootBeer(rootBeerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '12rem', margin: '10px' }}>
      <Card.Img variant="top" src={rootBeerObj.image} alt={rootBeerObj.name} style={{ height: '225px' }} />
      <Card.Title>{rootBeerObj.name}</Card.Title>
      {/* {Dynamic Link To view Root Beer Details} */}
      <Link href={`/rootBeer/${rootBeerObj.firebaseKey}`} passHref>
        <Button varian="primary" className="m-2">View</Button>
      </Link>
      {/* {Dynamic link to edit root beer details} */}
      <Link href={`/rootBeer/edit/${rootBeerObj.firebaseKey}`} passHref>
        <Button variant="info">Edit</Button>
      </Link>
      <Button
        variant="danger"
        onClick={deleteThisRootBeer}
        className="m-2"
      >Delete
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
  onUpdate: propTypes.func.isRequired,
};
