import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Eyeglasses, Trash } from 'react-bootstrap-icons';
import { deleteStore } from './API/storeData';

function StoreCard({ storeObj, onUpdate }) {
  if (!storeObj) {
    return <p>No Store Data Available</p>;
  }
  const deleteThisStore = () => {
    if (window.confirm('Are you sure you want to delete this store and all associated root beers?')) {
      deleteStore(storeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="card"
      style={{
        width: '12rem', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <Card.Body className="storeCard">
        <Card.Title>{storeObj.name}</Card.Title>
        <div className="button-container">
          <Link href={`/Stores/${storeObj.firebaseKey}`} passHref>
            <Eyeglasses type="button" className="m-2">
              Store Details
            </Eyeglasses>
          </Link>
          <Trash type="button" onClick={deleteThisStore} className="m-2">
            DELETE
          </Trash>
        </div>
      </Card.Body>
    </Card>
  );
}

StoreCard.propTypes = {
  storeObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
StoreCard.defaultProps = {
  storeObj: null,
  onUpdate: () => {},
};

export default StoreCard;
