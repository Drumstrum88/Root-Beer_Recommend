import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
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
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{storeObj.name}</Card.Title>
        <Link href={`/Stores/${storeObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            Store Details
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisStore} className="m-2">
          DELETE
        </Button>
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
