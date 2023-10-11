import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  favorite: false,
};

function AuthorForm({ obj }) {
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
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          router.push('/author/view');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white text-center mt-4">
        {obj.firebaseKey ? 'Update' : 'Create'} Author
      </h2>

      <Form.Group
        className="mb-3 mt-3"
      >
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
      >
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check
          type="switch"
          id="favorite"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} Author
      </Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;
