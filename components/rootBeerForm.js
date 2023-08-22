import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import { getStores } from './API/storeData';
import { createRootBeer, editRootBeer } from './API/rootBeerData';

const initialState = {
  name: '',
  image: '',
  description: '',
};

function RootBeerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [stores, setStores] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getStores().then(setStores);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      editRootBeer(formInput).then(() => router.push(`/rootBeer/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRootBeer(payload).then(({ name }) => {
        const patchPayload = { ...payload, firebaseKey: name };
        editRootBeer(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Edit' : 'Recommend'} Root Beer!</h2>

      <FloatingLabel controlId="floatingInput1" label="Root Beer Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Root Beer Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Root Beer Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* Display the image preview */}
      {formInput.image && (
      <div className="image-preview">
        <Image src={formInput.image} alt="Root Beer" width={200} height={200} />
      </div>
      )}

      <FloatingLabel controlId="floatingTextarea" label="Root Beer Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter a root beer description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Store">
        <Form.Select
          aria-label="Store"
          name="storeId"
          onChange={handleChange}
          value={formInput.storeId}
          required
        >
          <option value="">Select A Store</option>
          {
            stores.map((store) => (
              <option
                key={store.firebaseKey}
                value={store.firebaseKey}
              >
                {store.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Recommend'} Root Beer</Button>
    </Form>
  );
}

RootBeerForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    store: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

RootBeerForm.defaultProps = {
  obj: initialState,
};

export default RootBeerForm;
