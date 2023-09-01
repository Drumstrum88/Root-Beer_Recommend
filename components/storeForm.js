import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createStore, updateStore } from './API/storeData';

const initialState = {
  name: '',
};

export default function StoreForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

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
      updateStore(formInput).then(() => router.push(`/Store/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createStore(payload).then((data) => {
        const { firebaseKey } = data;
        const patchPayload = { ...payload, firebaseKey };
        updateStore(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Store</h2>
      <FloatingLabel controlId="floatingInput1" label="Store Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Store Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button className="genericBtn" type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Store</Button>
    </Form>
  );
}

StoreForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

StoreForm.defaultProps = {
  obj: initialState,
};
