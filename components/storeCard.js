import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CurrencyDollar, Eyeglasses, Trash } from 'react-bootstrap-icons';
import { deleteStore, getUserStores } from './API/storeData';
import { useAuth } from '../utils/context/authContext';

function StoreCard({ storeObj }) {
  const { user } = useAuth();
  if (!storeObj) {
    return <p>No Store Data Available</p>;
  }
  const deleteThisStore = () => {
    // eslint-disable-next-line react/prop-types
    if (user && user.uid === storeObj.uid) {
      if (window.confirm(`Delete ${storeObj.name}?`)) {
        deleteStore(storeObj.firebaseKey)
          .then(() => getUserStores)
          .catch((error) => {
            console.error('Error deleting store:', error);
          });
      }
    } else {
      alert('You do not have permission to delete this store.');
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
          <a href={storeObj.storeSite} target="_blank" rel="noopener noreferrer">
            <CurrencyDollar type="button" className="m-2">{storeObj.storeSite}</CurrencyDollar>
          </a>
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
    storeSite: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
StoreCard.defaultProps = {
  storeObj: null,
};

export default StoreCard;
